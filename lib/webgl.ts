/*
 * Minimal full-screen fragment-shader runner shared by the site's WebGL backdrops.
 * Draws one triangle covering the canvas, keeps the canvas sized to its box,
 * pauses while off screen, and renders a single still frame for reduced motion.
 *
 * Built to fail quietly: no WebGL2, a shader that will not link, or a context the
 * browser takes away (GPU reset, sleep, background tab) leaves the canvas empty
 * instead of throwing, and a restored context is rebuilt automatically.
 */

const VERT = `#version 300 es
in vec2 position;
void main() {
	gl_Position = vec4(position, 0.0, 1.0);
}`;

export type ShaderFrame = {
	gl: WebGL2RenderingContext;
	uniform: (name: string) => WebGLUniformLocation | null;
	width: number;
	height: number;
};

type Options = {
	fragment: string;
	/** Caps the backing-store resolution; these effects are soft, so 1–1.5 is plenty. */
	maxDpr?: number;
	/** Runs after every (re)build, for uniforms that never change. */
	setup?: (frame: ShaderFrame) => void;
	/** Runs before every draw with the elapsed time in milliseconds. */
	update: (frame: ShaderFrame, ms: number) => void;
	/** Time used for the single frame drawn when the visitor prefers reduced motion. */
	stillTime?: number;
};

export const hexToRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

type Resources = { program: WebGLProgram; shaders: WebGLShader[]; buffer: WebGLBuffer };

function build(gl: WebGL2RenderingContext, fragment: string): Resources | null {
	const program = gl.createProgram();
	const buffer = gl.createBuffer();
	if (!program || !buffer) return null;

	const shaders: WebGLShader[] = [];
	for (const [type, source] of [
		[gl.VERTEX_SHADER, VERT],
		[gl.FRAGMENT_SHADER, fragment]
	] as const) {
		const shader = gl.createShader(type);
		if (!shader) return null;
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		gl.attachShader(program, shader);
		shaders.push(shader);
	}
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		if (!gl.isContextLost()) console.warn("Shader failed to link:", gl.getProgramInfoLog(program));
		return null;
	}
	gl.useProgram(program);

	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
	const position = gl.getAttribLocation(program, "position");
	gl.enableVertexAttribArray(position);
	gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
	gl.clearColor(0, 0, 0, 0);

	return { program, shaders, buffer };
}

function release(gl: WebGL2RenderingContext, res: Resources | null) {
	if (!res || gl.isContextLost()) return;
	for (const shader of res.shaders) gl.deleteShader(shader);
	gl.deleteBuffer(res.buffer);
	gl.deleteProgram(res.program);
}

/** Starts the shader on `canvas`; returns a cleanup function, or null when WebGL2 is unavailable. */
export function runShader(canvas: HTMLCanvasElement, options: Options): (() => void) | null {
	const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false });
	if (!gl || gl.isContextLost()) return null;

	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	let res: Resources | null = null;
	let locations = new Map<string, WebGLUniformLocation | null>();
	let raf = 0;
	let onScreen = true;

	const frame: ShaderFrame = {
		gl,
		width: 0,
		height: 0,
		uniform: (name) => {
			if (!res) return null;
			if (!locations.has(name)) locations.set(name, gl.getUniformLocation(res.program, name));
			return locations.get(name)!;
		}
	};

	const ready = () => res !== null && !gl.isContextLost();

	const draw = (ms: number) => {
		if (!ready()) return;
		options.update(frame, ms);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	};

	const resize = () => {
		const dpr = Math.min(window.devicePixelRatio || 1, options.maxDpr ?? 1.5);
		frame.width = canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
		frame.height = canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
		if (!ready()) return;
		gl.viewport(0, 0, frame.width, frame.height);
		gl.uniform2f(frame.uniform("uResolution"), frame.width, frame.height);
		// Resizing clears the canvas; the still frame has no loop to repaint it.
		if (reduced) draw(options.stillTime ?? 0);
	};

	const loop = (ms: number) => {
		draw(ms);
		raf = onScreen && ready() ? requestAnimationFrame(loop) : 0;
	};

	const start = () => {
		cancelAnimationFrame(raf);
		raf = 0;
		if (!ready()) return;
		if (reduced) draw(options.stillTime ?? 0);
		else if (onScreen) raf = requestAnimationFrame(loop);
	};

	const init = () => {
		res = build(gl, options.fragment);
		locations = new Map();
		if (!res) return;
		options.setup?.(frame);
		resize();
		start();
	};

	const onLost = (e: Event) => {
		e.preventDefault(); // Tells the browser we want the context back.
		cancelAnimationFrame(raf);
		raf = 0;
		res = null;
	};
	canvas.addEventListener("webglcontextlost", onLost);
	canvas.addEventListener("webglcontextrestored", init);

	const resizeObserver = new ResizeObserver(resize);
	resizeObserver.observe(canvas);

	// Only animate while the canvas is on screen.
	const visibility = new IntersectionObserver(([entry]) => {
		onScreen = entry.isIntersecting;
		start();
	});
	visibility.observe(canvas);

	init();

	return () => {
		cancelAnimationFrame(raf);
		visibility.disconnect();
		resizeObserver.disconnect();
		canvas.removeEventListener("webglcontextlost", onLost);
		canvas.removeEventListener("webglcontextrestored", init);
		// Free GPU objects but keep the context alive: React may remount on this same canvas.
		release(gl, res);
		res = null;
	};
}
