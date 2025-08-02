import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { circInOut, cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const wipeIn = (
	node: Element,
	params: { duration?: number; delay?: number }
): TransitionConfig => {
	return {
		duration: params.duration ?? 150,
		delay: params.delay ?? 0,
		css: (t) => {
			const eased = circInOut(t);
			return `clip-path: inset(0 0 ${100 - eased * 100}% 0);`;
		}
	};
};

export const reverseWipeIn = (
	node: Element,
	params: { duration?: number; delay?: number }
): TransitionConfig => {
	return {
		duration: params.duration ?? 150,
		delay: params.delay ?? 0,
		css: (t) => {
			const eased = circInOut(t);
			return `clip-path: inset(0 0 ${eased * 100}% 0);`;
		}
	};
};

export const wipeOut = (
	node: Element,
	params: { duration?: number; delay?: number }
): TransitionConfig => {
	return {
		duration: params.duration ?? 150,
		delay: params.delay ?? 0,
		css: (t) => {
			const eased = circInOut(t);
			return `clip-path: inset(${eased * 100}% 0 0 0);`;
		}
	};
};

export const reverseWipeOut = (
	node: Element,
	params: { duration?: number; delay?: number }
): TransitionConfig => {
	return {
		duration: params.duration ?? 150,
		delay: params.delay ?? 0,
		css: (t) => {
			const eased = circInOut(t);
			return `clip-path: inset(${100 - eased * 100}% 0 0 0);`;
		}
	};
};

export const typewriter = (node: Element, { speed = 1 }: { speed?: number }): TransitionConfig => {
	const text = node.textContent ?? '';
	const duration = text.length / (speed * 0.01);

	return {
		duration,
		tick: (t) => {
			const i = Math.trunc(text.length * t);
			node.textContent = text.slice(0, i);
		}
	};
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function capitalizeFirstLetter(string: string): string {
	if (typeof string !== 'string') return '';
	return string.charAt(0).toUpperCase() + string.slice(1);
}
