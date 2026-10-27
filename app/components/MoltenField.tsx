"use client";
import { useEffect, useRef } from "react";
import { hexToRgb, runShader } from "../../lib/webgl";

/*
 * Molten metaballs behind the About page: five charges on out-of-step orbits,
 * summed as an inverse-square field and thresholded, so the forms merge and
 * part like liquid metal. Cores run deep red to the logo red, rims catch amber.
 * It sits behind running text, so it ignores the pointer and stays dim.
 */

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uGround;
uniform vec3 uDeep;
uniform vec3 uCore;
uniform vec3 uRim;

out vec4 fragColor;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
	float v = 0.0;
	float a = 0.5;
	for (int i = 0; i < 6; i++) {
		v += a * noise(p);
		p = p * 2.03 + vec2(1.7, 9.2);
		a *= 0.5;
	}
	return v;
}

// Two-level domain warp: bends the field so edges ripple instead of staying perfectly round.
vec2 warp(vec2 p, float t) {
	vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
	vec2 r = vec2(fbm(p + 2.0 * q + vec2(1.7, 9.2)), fbm(p + 2.0 * q + vec2(8.3, 2.8)));
	return p + 0.08 * (r - 0.5);
}

void main() {
	float aspect = uResolution.x / uResolution.y;
	vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
	float t = uTime;
	vec2 p = warp(uv, t * 0.05);

	float field = 0.0;
	for (int i = 0; i < 5; i++) {
		float fi = float(i);
		vec2 c = vec2(
			sin(t * (0.13 + 0.031 * fi) + fi * 1.9) * 0.42 * aspect,
			cos(t * (0.11 + 0.027 * fi) + fi * 2.7) * 0.36
		);
		vec2 d = p - c;
		field += (0.011 + 0.004 * fi) / dot(d, d);
	}
	float body = smoothstep(0.97, 1.03, field);
	float halo = smoothstep(0.45, 1.0, field) * (1.0 - body);
	float rim = smoothstep(0.96, 1.0, field) * (1.0 - smoothstep(1.0, 1.12, field));
	float heat = clamp((field - 1.0) * 0.06, 0.0, 0.5);

	vec3 col = uGround;
	col = mix(col, uDeep, halo * 0.3);
	col = mix(col, mix(uDeep, uCore, heat + 0.25 * fbm(p * 3.0 + t * 0.04)), body);
	col += uRim * rim * 0.22;

	fragColor = vec4(col, 1.0);
}`;

const PALETTE = {
	uGround: "#0b0b0c",
	uDeep: "#2a0705",
	uCore: "#9e2017",
	uRim: "#ff7a3c"
};

export default function MoltenField({ className }: { className?: string }) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas) return;

		return (
			runShader(canvas, {
				fragment: FRAG,
				maxDpr: 1,
				stillTime: 40000,
				setup: ({ gl, uniform }) => {
					for (const [name, hex] of Object.entries(PALETTE)) gl.uniform3fv(uniform(name), hexToRgb(hex));
				},
				update: ({ gl, uniform }, ms) => gl.uniform1f(uniform("uTime"), ms * 0.001)
			}) ?? undefined
		);
	}, []);

	return <canvas ref={ref} aria-hidden className={className} />;
}
