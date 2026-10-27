"use client";
import { useEffect, useRef } from "react";
import { hexToRgb, runShader } from "../../lib/webgl";

/*
 * Taillight glow behind the hero: a slow red wash along the top of the frame,
 * like brake lights smeared across a night street. Simplex-noise "aurora"
 * shader drawn by the shared runShader helper.
 */

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColors[3];

out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
	const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
	vec2 i = floor(v + dot(v, C.yy));
	vec2 x0 = v - i + dot(i, C.xx);
	vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
	vec4 x12 = x0.xyxy + C.xxzz;
	x12.xy -= i1;
	i = mod(i, 289.0);
	vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
	vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
	m = m * m;
	m = m * m;
	vec3 x = 2.0 * fract(p * C.www) - 1.0;
	vec3 h = abs(x) - 0.5;
	vec3 ox = floor(x + 0.5);
	vec3 a0 = x - ox;
	m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
	vec3 g;
	g.x = a0.x * x0.x + h.x * x0.y;
	g.yz = a0.yz * x12.xz + h.yz * x12.yw;
	return 130.0 * dot(m, g);
}

void main() {
	vec2 uv = gl_FragCoord.xy / uResolution;

	// Three-stop ramp across the width.
	vec3 ramp = uv.x < 0.5
		? mix(uColors[0], uColors[1], uv.x * 2.0)
		: mix(uColors[1], uColors[2], (uv.x - 0.5) * 2.0);

	float height = exp(snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5);
	float intensity = 0.6 * (uv.y * 2.0 - height + 0.2);
	float alpha = smoothstep(0.2 - 0.25, 0.2 + 0.25, intensity);

	fragColor = vec4(intensity * ramp * alpha, alpha);
}`;

// Deep brake-light red → logo red → warm amber.
const COLORS = ["#6e0f0a", "#d32a1f", "#ff7a3c"];

export default function HeroGlow({ className }: { className?: string }) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		return (
			runShader(ref.current, {
				fragment: FRAG,
				// A soft wash: half resolution looks identical and costs a quarter of the pixels.
				maxDpr: 0.5,
				setup: ({ gl, uniform }) => gl.uniform3fv(uniform("uColors"), COLORS.flatMap(hexToRgb)),
				update: ({ gl, uniform }, ms) => gl.uniform1f(uniform("uTime"), ms * 0.0003),
				stillTime: 20000
			}) ?? undefined
		);
	}, []);

	return <canvas ref={ref} aria-hidden className={className} />;
}
