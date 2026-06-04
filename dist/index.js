import * as React$1 from "react";
import React, { createContext, createElement, forwardRef, useContext, useId, useLayoutEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as ReactDOM$1 from "react-dom";
import ReactDOM from "react-dom";
function setRef(e, n) {
	if (typeof e == "function") return e(n);
	e != null && (e.current = n);
}
function composeRefs(...e) {
	return (n) => {
		let i = !1, a = e.map((e) => {
			let a = setRef(e, n);
			return !i && typeof a == "function" && (i = !0), a;
		});
		if (i) return () => {
			for (let n = 0; n < a.length; n++) {
				let i = a[n];
				typeof i == "function" ? i() : setRef(e[n], null);
			}
		};
	};
}
function useComposedRefs(...n) {
	return React$1.useCallback(composeRefs(...n), n);
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy"), use = React$1.use;
function isPromiseLike(e) {
	return typeof e == "object" && !!e && "then" in e;
}
function isLazyComponent(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === REACT_LAZY_TYPE && "_payload" in e && isPromiseLike(e._payload);
}
/* @__NO_SIDE_EFFECTS__ */
function createSlot$1(n) {
	let i = /* @__PURE__ */ createSlotClone$1(n), a = React$1.forwardRef((n, a) => {
		let { children: o, ...s } = n;
		isLazyComponent(o) && typeof use == "function" && (o = use(o._payload));
		let c = React$1.Children.toArray(o), l = c.find(isSlottable$1);
		if (l) {
			let n = l.props.children, o = c.map((i) => i === l ? React$1.Children.count(n) > 1 ? React$1.Children.only(null) : React$1.isValidElement(n) ? n.props.children : null : i);
			return /* @__PURE__ */ jsx(i, {
				...s,
				ref: a,
				children: React$1.isValidElement(n) ? React$1.cloneElement(n, void 0, o) : null
			});
		}
		return /* @__PURE__ */ jsx(i, {
			...s,
			ref: a,
			children: o
		});
	});
	return a.displayName = `${n}.Slot`, a;
}
var Slot$2 = /* @__PURE__ */ createSlot$1("Slot");
/* @__NO_SIDE_EFFECTS__ */
function createSlotClone$1(n) {
	let i = React$1.forwardRef((n, i) => {
		let { children: a, ...o } = n;
		if (isLazyComponent(a) && typeof use == "function" && (a = use(a._payload)), React$1.isValidElement(a)) {
			let n = getElementRef$2(a), s = mergeProps$1(o, a.props);
			return a.type !== React$1.Fragment && (s.ref = i ? composeRefs(i, n) : n), React$1.cloneElement(a, s);
		}
		return React$1.Children.count(a) > 1 ? React$1.Children.only(null) : null;
	});
	return i.displayName = `${n}.SlotClone`, i;
}
var SLOTTABLE_IDENTIFIER$1 = Symbol("radix.slottable");
function isSlottable$1(n) {
	return React$1.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === SLOTTABLE_IDENTIFIER$1;
}
function mergeProps$1(e, n) {
	let i = { ...n };
	for (let a in n) {
		let o = e[a], s = n[a];
		/^on[A-Z]/.test(a) ? o && s ? i[a] = (...e) => {
			let n = s(...e);
			return o(...e), n;
		} : o && (i[a] = o) : a === "style" ? i[a] = {
			...o,
			...s
		} : a === "className" && (i[a] = [o, s].filter(Boolean).join(" "));
	}
	return {
		...e,
		...i
	};
}
function getElementRef$2(e) {
	let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
	return i ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? e.props.ref : e.props.ref || e.ref);
}
function r(e) {
	var n, i, a = "";
	if (typeof e == "string" || typeof e == "number") a += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var o = e.length;
		for (n = 0; n < o; n++) e[n] && (i = r(e[n])) && (a && (a += " "), a += i);
	} else for (i in e) e[i] && (a && (a += " "), a += i);
	return a;
}
function clsx() {
	for (var e, n, i = 0, a = "", o = arguments.length; i < o; i++) (e = arguments[i]) && (n = r(e)) && (a && (a += " "), a += n);
	return a;
}
var concatArrays = (e, n) => {
	let i = Array(e.length + n.length);
	for (let n = 0; n < e.length; n++) i[n] = e[n];
	for (let a = 0; a < n.length; a++) i[e.length + a] = n[a];
	return i;
}, createClassValidatorObject = (e, n) => ({
	classGroupId: e,
	validator: n
}), createClassPartObject = (e = /* @__PURE__ */ new Map(), n = null, i) => ({
	nextPart: e,
	validators: n,
	classGroupId: i
}), CLASS_PART_SEPARATOR = "-", EMPTY_CONFLICTS = [], ARBITRARY_PROPERTY_PREFIX = "arbitrary..", createClassGroupUtils = (e) => {
	let n = createClassMap(e), { conflictingClassGroups: i, conflictingClassGroupModifiers: a } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return getGroupIdForArbitraryProperty(e);
			let i = e.split(CLASS_PART_SEPARATOR);
			return getGroupRecursive(i, i[0] === "" && i.length > 1 ? 1 : 0, n);
		},
		getConflictingClassGroupIds: (e, n) => {
			if (n) {
				let n = a[e], o = i[e];
				return n ? o ? concatArrays(o, n) : n : o || EMPTY_CONFLICTS;
			}
			return i[e] || EMPTY_CONFLICTS;
		}
	};
}, getGroupRecursive = (e, n, i) => {
	if (e.length - n === 0) return i.classGroupId;
	let a = e[n], o = i.nextPart.get(a);
	if (o) {
		let i = getGroupRecursive(e, n + 1, o);
		if (i) return i;
	}
	let s = i.validators;
	if (s === null) return;
	let c = n === 0 ? e.join(CLASS_PART_SEPARATOR) : e.slice(n).join(CLASS_PART_SEPARATOR), l = s.length;
	for (let e = 0; e < l; e++) {
		let n = s[e];
		if (n.validator(c)) return n.classGroupId;
	}
}, getGroupIdForArbitraryProperty = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let n = e.slice(1, -1), i = n.indexOf(":"), a = n.slice(0, i);
	return a ? ARBITRARY_PROPERTY_PREFIX + a : void 0;
})(), createClassMap = (e) => {
	let { theme: n, classGroups: i } = e;
	return processClassGroups(i, n);
}, processClassGroups = (e, n) => {
	let i = createClassPartObject();
	for (let a in e) {
		let o = e[a];
		processClassesRecursively(o, i, a, n);
	}
	return i;
}, processClassesRecursively = (e, n, i, a) => {
	let o = e.length;
	for (let s = 0; s < o; s++) {
		let o = e[s];
		processClassDefinition(o, n, i, a);
	}
}, processClassDefinition = (e, n, i, a) => {
	if (typeof e == "string") {
		processStringDefinition(e, n, i);
		return;
	}
	if (typeof e == "function") {
		processFunctionDefinition(e, n, i, a);
		return;
	}
	processObjectDefinition(e, n, i, a);
}, processStringDefinition = (e, n, i) => {
	let a = e === "" ? n : getPart(n, e);
	a.classGroupId = i;
}, processFunctionDefinition = (e, n, i, a) => {
	if (isThemeGetter(e)) {
		processClassesRecursively(e(a), n, i, a);
		return;
	}
	n.validators === null && (n.validators = []), n.validators.push(createClassValidatorObject(i, e));
}, processObjectDefinition = (e, n, i, a) => {
	let o = Object.entries(e), s = o.length;
	for (let e = 0; e < s; e++) {
		let [s, c] = o[e];
		processClassesRecursively(c, getPart(n, s), i, a);
	}
}, getPart = (e, n) => {
	let i = e, a = n.split(CLASS_PART_SEPARATOR), o = a.length;
	for (let e = 0; e < o; e++) {
		let n = a[e], o = i.nextPart.get(n);
		o || (o = createClassPartObject(), i.nextPart.set(n, o)), i = o;
	}
	return i;
}, isThemeGetter = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, createLruCache = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let n = 0, i = Object.create(null), a = Object.create(null), o = (o, s) => {
		i[o] = s, n++, n > e && (n = 0, a = i, i = Object.create(null));
	};
	return {
		get(e) {
			let n = i[e];
			if (n !== void 0) return n;
			if ((n = a[e]) !== void 0) return o(e, n), n;
		},
		set(e, n) {
			e in i ? i[e] = n : o(e, n);
		}
	};
}, IMPORTANT_MODIFIER = "!", MODIFIER_SEPARATOR = ":", EMPTY_MODIFIERS = [], createResultObject = (e, n, i, a, o) => ({
	modifiers: e,
	hasImportantModifier: n,
	baseClassName: i,
	maybePostfixModifierPosition: a,
	isExternal: o
}), createParseClassName = (e) => {
	let { prefix: n, experimentalParseClassName: i } = e, a = (e) => {
		let n = [], i = 0, a = 0, o = 0, s, c = e.length;
		for (let l = 0; l < c; l++) {
			let c = e[l];
			if (i === 0 && a === 0) {
				if (c === MODIFIER_SEPARATOR) {
					n.push(e.slice(o, l)), o = l + 1;
					continue;
				}
				if (c === "/") {
					s = l;
					continue;
				}
			}
			c === "[" ? i++ : c === "]" ? i-- : c === "(" ? a++ : c === ")" && a--;
		}
		let l = n.length === 0 ? e : e.slice(o), u = l, d = !1;
		l.endsWith(IMPORTANT_MODIFIER) ? (u = l.slice(0, -1), d = !0) : l.startsWith(IMPORTANT_MODIFIER) && (u = l.slice(1), d = !0);
		let f = s && s > o ? s - o : void 0;
		return createResultObject(n, d, u, f);
	};
	if (n) {
		let e = n + MODIFIER_SEPARATOR, i = a;
		a = (n) => n.startsWith(e) ? i(n.slice(e.length)) : createResultObject(EMPTY_MODIFIERS, !1, n, void 0, !0);
	}
	if (i) {
		let e = a;
		a = (n) => i({
			className: n,
			parseClassName: e
		});
	}
	return a;
}, createSortModifiers = (e) => {
	let n = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, i) => {
		n.set(e, 1e6 + i);
	}), (e) => {
		let i = [], a = [];
		for (let o = 0; o < e.length; o++) {
			let s = e[o], c = s[0] === "[", l = n.has(s);
			c || l ? (a.length > 0 && (a.sort(), i.push(...a), a = []), i.push(s)) : a.push(s);
		}
		return a.length > 0 && (a.sort(), i.push(...a)), i;
	};
}, createConfigUtils = (e) => ({
	cache: createLruCache(e.cacheSize),
	parseClassName: createParseClassName(e),
	sortModifiers: createSortModifiers(e),
	postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(e),
	...createClassGroupUtils(e)
}), createPostfixLookupClassGroupIds = (e) => {
	let n = Object.create(null), i = e.postfixLookupClassGroups;
	if (i) for (let e = 0; e < i.length; e++) n[i[e]] = !0;
	return n;
}, SPLIT_CLASSES_REGEX = /\s+/, mergeClassList = (e, n) => {
	let { parseClassName: i, getClassGroupId: a, getConflictingClassGroupIds: o, sortModifiers: s, postfixLookupClassGroupIds: c } = n, l = [], u = e.trim().split(SPLIT_CLASSES_REGEX), d = "";
	for (let e = u.length - 1; e >= 0; --e) {
		let n = u[e], { isExternal: f, modifiers: p, hasImportantModifier: m, baseClassName: h, maybePostfixModifierPosition: g } = i(n);
		if (f) {
			d = n + (d.length > 0 ? " " + d : d);
			continue;
		}
		let _ = !!g, v;
		if (_) {
			v = a(h.substring(0, g));
			let e = v && c[v] ? a(h) : void 0;
			e && e !== v && (v = e, _ = !1);
		} else v = a(h);
		if (!v) {
			if (!_) {
				d = n + (d.length > 0 ? " " + d : d);
				continue;
			}
			if (v = a(h), !v) {
				d = n + (d.length > 0 ? " " + d : d);
				continue;
			}
			_ = !1;
		}
		let y = p.length === 0 ? "" : p.length === 1 ? p[0] : s(p).join(":"), b = m ? y + IMPORTANT_MODIFIER : y, x = b + v;
		if (l.indexOf(x) > -1) continue;
		l.push(x);
		let S = o(v, _);
		for (let e = 0; e < S.length; ++e) {
			let n = S[e];
			l.push(b + n);
		}
		d = n + (d.length > 0 ? " " + d : d);
	}
	return d;
}, twJoin = (...e) => {
	let n = 0, i, a, o = "";
	for (; n < e.length;) (i = e[n++]) && (a = toValue(i)) && (o && (o += " "), o += a);
	return o;
}, toValue = (e) => {
	if (typeof e == "string") return e;
	let n, i = "";
	for (let a = 0; a < e.length; a++) e[a] && (n = toValue(e[a])) && (i && (i += " "), i += n);
	return i;
}, createTailwindMerge = (e, ...n) => {
	let i, a, o, s, c = (c) => (i = createConfigUtils(n.reduce((e, n) => n(e), e())), a = i.cache.get, o = i.cache.set, s = l, l(c)), l = (e) => {
		let n = a(e);
		if (n) return n;
		let s = mergeClassList(e, i);
		return o(e, s), s;
	};
	return s = c, (...e) => s(twJoin(...e));
}, fallbackThemeArr = [], fromTheme = (e) => {
	let n = (n) => n[e] || fallbackThemeArr;
	return n.isThemeGetter = !0, n;
}, arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i, fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, isFraction = (e) => fractionRegex.test(e), isNumber = (e) => !!e && !Number.isNaN(Number(e)), isInteger = (e) => !!e && Number.isInteger(Number(e)), isPercent = (e) => e.endsWith("%") && isNumber(e.slice(0, -1)), isTshirtSize = (e) => tshirtUnitRegex.test(e), isAny = () => !0, isLengthOnly = (e) => lengthUnitRegex.test(e) && !colorFunctionRegex.test(e), isNever = () => !1, isShadow = (e) => shadowRegex.test(e), isImage = (e) => imageRegex.test(e), isAnyNonArbitrary = (e) => !isArbitraryValue(e) && !isArbitraryVariable(e), isNamedContainerQuery = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), isArbitrarySize = (e) => getIsArbitraryValue(e, isLabelSize, isNever), isArbitraryValue = (e) => arbitraryValueRegex.test(e), isArbitraryLength = (e) => getIsArbitraryValue(e, isLabelLength, isLengthOnly), isArbitraryNumber = (e) => getIsArbitraryValue(e, isLabelNumber, isNumber), isArbitraryWeight = (e) => getIsArbitraryValue(e, isLabelWeight, isAny), isArbitraryFamilyName = (e) => getIsArbitraryValue(e, isLabelFamilyName, isNever), isArbitraryPosition = (e) => getIsArbitraryValue(e, isLabelPosition, isNever), isArbitraryImage = (e) => getIsArbitraryValue(e, isLabelImage, isImage), isArbitraryShadow = (e) => getIsArbitraryValue(e, isLabelShadow, isShadow), isArbitraryVariable = (e) => arbitraryVariableRegex.test(e), isArbitraryVariableLength = (e) => getIsArbitraryVariable(e, isLabelLength), isArbitraryVariableFamilyName = (e) => getIsArbitraryVariable(e, isLabelFamilyName), isArbitraryVariablePosition = (e) => getIsArbitraryVariable(e, isLabelPosition), isArbitraryVariableSize = (e) => getIsArbitraryVariable(e, isLabelSize), isArbitraryVariableImage = (e) => getIsArbitraryVariable(e, isLabelImage), isArbitraryVariableShadow = (e) => getIsArbitraryVariable(e, isLabelShadow, !0), isArbitraryVariableWeight = (e) => getIsArbitraryVariable(e, isLabelWeight, !0), getIsArbitraryValue = (e, n, i) => {
	let a = arbitraryValueRegex.exec(e);
	return a ? a[1] ? n(a[1]) : i(a[2]) : !1;
}, getIsArbitraryVariable = (e, n, i = !1) => {
	let a = arbitraryVariableRegex.exec(e);
	return a ? a[1] ? n(a[1]) : i : !1;
}, isLabelPosition = (e) => e === "position" || e === "percentage", isLabelImage = (e) => e === "image" || e === "url", isLabelSize = (e) => e === "length" || e === "size" || e === "bg-size", isLabelLength = (e) => e === "length", isLabelNumber = (e) => e === "number", isLabelFamilyName = (e) => e === "family-name", isLabelWeight = (e) => e === "number" || e === "weight", isLabelShadow = (e) => e === "shadow", twMerge = /* @__PURE__ */ createTailwindMerge(() => {
	let e = fromTheme("color"), n = fromTheme("font"), i = fromTheme("text"), a = fromTheme("font-weight"), o = fromTheme("tracking"), s = fromTheme("leading"), c = fromTheme("breakpoint"), l = fromTheme("container"), u = fromTheme("spacing"), d = fromTheme("radius"), f = fromTheme("shadow"), p = fromTheme("inset-shadow"), m = fromTheme("text-shadow"), h = fromTheme("drop-shadow"), g = fromTheme("blur"), _ = fromTheme("perspective"), v = fromTheme("aspect"), y = fromTheme("ease"), b = fromTheme("animate"), x = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], S = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], C = () => [
		...S(),
		isArbitraryVariable,
		isArbitraryValue
	], w = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], T = () => [
		"auto",
		"contain",
		"none"
	], E = () => [
		isArbitraryVariable,
		isArbitraryValue,
		u
	], D = () => [
		isFraction,
		"full",
		"auto",
		...E()
	], O = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	], k = () => [
		"auto",
		{ span: [
			"full",
			isInteger,
			isArbitraryVariable,
			isArbitraryValue
		] },
		isInteger,
		isArbitraryVariable,
		isArbitraryValue
	], A = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	], j = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	], M = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], N = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], P = () => ["auto", ...E()], F = () => [
		isFraction,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...E()
	], I = () => [
		isFraction,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...E()
	], L = () => [
		isFraction,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...E()
	], R = () => [
		e,
		isArbitraryVariable,
		isArbitraryValue
	], z = () => [
		...S(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	], B = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], V = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	], H = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	], U = () => [
		"",
		"none",
		"full",
		d,
		isArbitraryVariable,
		isArbitraryValue
	], W = () => [
		"",
		isNumber,
		isArbitraryVariableLength,
		isArbitraryLength
	], G = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], K = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], q = () => [
		isNumber,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	], J = () => [
		"",
		"none",
		g,
		isArbitraryVariable,
		isArbitraryValue
	], Y = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	], Z = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	], Q = () => [
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	], $ = () => [
		isFraction,
		"full",
		...E()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [isTshirtSize],
			breakpoint: [isTshirtSize],
			color: [isAny],
			container: [isTshirtSize],
			"drop-shadow": [isTshirtSize],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [isAnyNonArbitrary],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [isTshirtSize],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [isTshirtSize],
			shadow: [isTshirtSize],
			spacing: ["px", isNumber],
			text: [isTshirtSize],
			"text-shadow": [isTshirtSize],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				isFraction,
				isArbitraryValue,
				isArbitraryVariable,
				v
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"container-named": [isNamedContainerQuery],
			columns: [{ columns: [
				isNumber,
				isArbitraryValue,
				isArbitraryVariable,
				l
			] }],
			"break-after": [{ "break-after": x() }],
			"break-before": [{ "break-before": x() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: C() }],
			overflow: [{ overflow: w() }],
			"overflow-x": [{ "overflow-x": w() }],
			"overflow-y": [{ "overflow-y": w() }],
			overscroll: [{ overscroll: T() }],
			"overscroll-x": [{ "overscroll-x": T() }],
			"overscroll-y": [{ "overscroll-y": T() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: D() }],
			"inset-x": [{ "inset-x": D() }],
			"inset-y": [{ "inset-y": D() }],
			start: [{
				"inset-s": D(),
				start: D()
			}],
			end: [{
				"inset-e": D(),
				end: D()
			}],
			"inset-bs": [{ "inset-bs": D() }],
			"inset-be": [{ "inset-be": D() }],
			top: [{ top: D() }],
			right: [{ right: D() }],
			bottom: [{ bottom: D() }],
			left: [{ left: D() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				isInteger,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			basis: [{ basis: [
				isFraction,
				"full",
				"auto",
				l,
				...E()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				isNumber,
				isFraction,
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			grow: [{ grow: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			shrink: [{ shrink: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			order: [{ order: [
				isInteger,
				"first",
				"last",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"grid-cols": [{ "grid-cols": O() }],
			"col-start-end": [{ col: k() }],
			"col-start": [{ "col-start": A() }],
			"col-end": [{ "col-end": A() }],
			"grid-rows": [{ "grid-rows": O() }],
			"row-start-end": [{ row: k() }],
			"row-start": [{ "row-start": A() }],
			"row-end": [{ "row-end": A() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": j() }],
			"auto-rows": [{ "auto-rows": j() }],
			gap: [{ gap: E() }],
			"gap-x": [{ "gap-x": E() }],
			"gap-y": [{ "gap-y": E() }],
			"justify-content": [{ justify: [...M(), "normal"] }],
			"justify-items": [{ "justify-items": [...N(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...N()] }],
			"align-content": [{ content: ["normal", ...M()] }],
			"align-items": [{ items: [...N(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...N(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": M() }],
			"place-items": [{ "place-items": [...N(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...N()] }],
			p: [{ p: E() }],
			px: [{ px: E() }],
			py: [{ py: E() }],
			ps: [{ ps: E() }],
			pe: [{ pe: E() }],
			pbs: [{ pbs: E() }],
			pbe: [{ pbe: E() }],
			pt: [{ pt: E() }],
			pr: [{ pr: E() }],
			pb: [{ pb: E() }],
			pl: [{ pl: E() }],
			m: [{ m: P() }],
			mx: [{ mx: P() }],
			my: [{ my: P() }],
			ms: [{ ms: P() }],
			me: [{ me: P() }],
			mbs: [{ mbs: P() }],
			mbe: [{ mbe: P() }],
			mt: [{ mt: P() }],
			mr: [{ mr: P() }],
			mb: [{ mb: P() }],
			ml: [{ ml: P() }],
			"space-x": [{ "space-x": E() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": E() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: F() }],
			"inline-size": [{ inline: ["auto", ...I()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...I()] }],
			"max-inline-size": [{ "max-inline": ["none", ...I()] }],
			"block-size": [{ block: ["auto", ...L()] }],
			"min-block-size": [{ "min-block": ["auto", ...L()] }],
			"max-block-size": [{ "max-block": ["none", ...L()] }],
			w: [{ w: [
				l,
				"screen",
				...F()
			] }],
			"min-w": [{ "min-w": [
				l,
				"screen",
				"none",
				...F()
			] }],
			"max-w": [{ "max-w": [
				l,
				"screen",
				"none",
				"prose",
				{ screen: [c] },
				...F()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...F()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...F()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...F()
			] }],
			"font-size": [{ text: [
				"base",
				i,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				a,
				isArbitraryVariableWeight,
				isArbitraryWeight
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				isPercent,
				isArbitraryValue
			] }],
			"font-family": [{ font: [
				isArbitraryVariableFamilyName,
				isArbitraryFamilyName,
				n
			] }],
			"font-features": [{ "font-features": [isArbitraryValue] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				o,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"line-clamp": [{ "line-clamp": [
				isNumber,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			leading: [{ leading: [s, ...E()] }],
			"list-image": [{ "list-image": [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: R() }],
			"text-color": [{ text: R() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...G(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				isNumber,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			"text-decoration-color": [{ decoration: R() }],
			"underline-offset": [{ "underline-offset": [
				isNumber,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: E() }],
			"tab-size": [{ tab: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: z() }],
			"bg-repeat": [{ bg: B() }],
			"bg-size": [{ bg: V() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					],
					radial: [
						"",
						isArbitraryVariable,
						isArbitraryValue
					],
					conic: [
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					]
				},
				isArbitraryVariableImage,
				isArbitraryImage
			] }],
			"bg-color": [{ bg: R() }],
			"gradient-from-pos": [{ from: H() }],
			"gradient-via-pos": [{ via: H() }],
			"gradient-to-pos": [{ to: H() }],
			"gradient-from": [{ from: R() }],
			"gradient-via": [{ via: R() }],
			"gradient-to": [{ to: R() }],
			rounded: [{ rounded: U() }],
			"rounded-s": [{ "rounded-s": U() }],
			"rounded-e": [{ "rounded-e": U() }],
			"rounded-t": [{ "rounded-t": U() }],
			"rounded-r": [{ "rounded-r": U() }],
			"rounded-b": [{ "rounded-b": U() }],
			"rounded-l": [{ "rounded-l": U() }],
			"rounded-ss": [{ "rounded-ss": U() }],
			"rounded-se": [{ "rounded-se": U() }],
			"rounded-ee": [{ "rounded-ee": U() }],
			"rounded-es": [{ "rounded-es": U() }],
			"rounded-tl": [{ "rounded-tl": U() }],
			"rounded-tr": [{ "rounded-tr": U() }],
			"rounded-br": [{ "rounded-br": U() }],
			"rounded-bl": [{ "rounded-bl": U() }],
			"border-w": [{ border: W() }],
			"border-w-x": [{ "border-x": W() }],
			"border-w-y": [{ "border-y": W() }],
			"border-w-s": [{ "border-s": W() }],
			"border-w-e": [{ "border-e": W() }],
			"border-w-bs": [{ "border-bs": W() }],
			"border-w-be": [{ "border-be": W() }],
			"border-w-t": [{ "border-t": W() }],
			"border-w-r": [{ "border-r": W() }],
			"border-w-b": [{ "border-b": W() }],
			"border-w-l": [{ "border-l": W() }],
			"divide-x": [{ "divide-x": W() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": W() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...G(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...G(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: R() }],
			"border-color-x": [{ "border-x": R() }],
			"border-color-y": [{ "border-y": R() }],
			"border-color-s": [{ "border-s": R() }],
			"border-color-e": [{ "border-e": R() }],
			"border-color-bs": [{ "border-bs": R() }],
			"border-color-be": [{ "border-be": R() }],
			"border-color-t": [{ "border-t": R() }],
			"border-color-r": [{ "border-r": R() }],
			"border-color-b": [{ "border-b": R() }],
			"border-color-l": [{ "border-l": R() }],
			"divide-color": [{ divide: R() }],
			"outline-style": [{ outline: [
				...G(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"outline-w": [{ outline: [
				"",
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			"outline-color": [{ outline: R() }],
			shadow: [{ shadow: [
				"",
				"none",
				f,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"shadow-color": [{ shadow: R() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				p,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"inset-shadow-color": [{ "inset-shadow": R() }],
			"ring-w": [{ ring: W() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: R() }],
			"ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
			"ring-offset-color": [{ "ring-offset": R() }],
			"inset-ring-w": [{ "inset-ring": W() }],
			"inset-ring-color": [{ "inset-ring": R() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				m,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"text-shadow-color": [{ "text-shadow": R() }],
			opacity: [{ opacity: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"mix-blend": [{ "mix-blend": [
				...K(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": K() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [isNumber] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": q() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": q() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": R() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": R() }],
			"mask-image-t-from-pos": [{ "mask-t-from": q() }],
			"mask-image-t-to-pos": [{ "mask-t-to": q() }],
			"mask-image-t-from-color": [{ "mask-t-from": R() }],
			"mask-image-t-to-color": [{ "mask-t-to": R() }],
			"mask-image-r-from-pos": [{ "mask-r-from": q() }],
			"mask-image-r-to-pos": [{ "mask-r-to": q() }],
			"mask-image-r-from-color": [{ "mask-r-from": R() }],
			"mask-image-r-to-color": [{ "mask-r-to": R() }],
			"mask-image-b-from-pos": [{ "mask-b-from": q() }],
			"mask-image-b-to-pos": [{ "mask-b-to": q() }],
			"mask-image-b-from-color": [{ "mask-b-from": R() }],
			"mask-image-b-to-color": [{ "mask-b-to": R() }],
			"mask-image-l-from-pos": [{ "mask-l-from": q() }],
			"mask-image-l-to-pos": [{ "mask-l-to": q() }],
			"mask-image-l-from-color": [{ "mask-l-from": R() }],
			"mask-image-l-to-color": [{ "mask-l-to": R() }],
			"mask-image-x-from-pos": [{ "mask-x-from": q() }],
			"mask-image-x-to-pos": [{ "mask-x-to": q() }],
			"mask-image-x-from-color": [{ "mask-x-from": R() }],
			"mask-image-x-to-color": [{ "mask-x-to": R() }],
			"mask-image-y-from-pos": [{ "mask-y-from": q() }],
			"mask-image-y-to-pos": [{ "mask-y-to": q() }],
			"mask-image-y-from-color": [{ "mask-y-from": R() }],
			"mask-image-y-to-color": [{ "mask-y-to": R() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": q() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": q() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": R() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": R() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": S() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": q() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": q() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": R() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": R() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: z() }],
			"mask-repeat": [{ mask: B() }],
			"mask-size": [{ mask: V() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			filter: [{ filter: [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			blur: [{ blur: J() }],
			brightness: [{ brightness: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			contrast: [{ contrast: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				h,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"drop-shadow-color": [{ "drop-shadow": R() }],
			grayscale: [{ grayscale: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"hue-rotate": [{ "hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			invert: [{ invert: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			saturate: [{ saturate: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			sepia: [{ sepia: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-blur": [{ "backdrop-blur": J() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": E() }],
			"border-spacing-x": [{ "border-spacing-x": E() }],
			"border-spacing-y": [{ "border-spacing-y": E() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				isNumber,
				"initial",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				y,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			delay: [{ delay: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			animate: [{ animate: [
				"none",
				b,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				_,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"perspective-origin": [{ "perspective-origin": C() }],
			rotate: [{ rotate: Y() }],
			"rotate-x": [{ "rotate-x": Y() }],
			"rotate-y": [{ "rotate-y": Y() }],
			"rotate-z": [{ "rotate-z": Y() }],
			scale: [{ scale: Z() }],
			"scale-x": [{ "scale-x": Z() }],
			"scale-y": [{ "scale-y": Z() }],
			"scale-z": [{ "scale-z": Z() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: Q() }],
			"skew-x": [{ "skew-x": Q() }],
			"skew-y": [{ "skew-y": Q() }],
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: C() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: $() }],
			"translate-x": [{ "translate-x": $() }],
			"translate-y": [{ "translate-y": $() }],
			"translate-z": [{ "translate-z": $() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			accent: [{ accent: R() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: R() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": R() }],
			"scrollbar-track-color": [{ "scrollbar-track": R() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": E() }],
			"scroll-mx": [{ "scroll-mx": E() }],
			"scroll-my": [{ "scroll-my": E() }],
			"scroll-ms": [{ "scroll-ms": E() }],
			"scroll-me": [{ "scroll-me": E() }],
			"scroll-mbs": [{ "scroll-mbs": E() }],
			"scroll-mbe": [{ "scroll-mbe": E() }],
			"scroll-mt": [{ "scroll-mt": E() }],
			"scroll-mr": [{ "scroll-mr": E() }],
			"scroll-mb": [{ "scroll-mb": E() }],
			"scroll-ml": [{ "scroll-ml": E() }],
			"scroll-p": [{ "scroll-p": E() }],
			"scroll-px": [{ "scroll-px": E() }],
			"scroll-py": [{ "scroll-py": E() }],
			"scroll-ps": [{ "scroll-ps": E() }],
			"scroll-pe": [{ "scroll-pe": E() }],
			"scroll-pbs": [{ "scroll-pbs": E() }],
			"scroll-pbe": [{ "scroll-pbe": E() }],
			"scroll-pt": [{ "scroll-pt": E() }],
			"scroll-pr": [{ "scroll-pr": E() }],
			"scroll-pb": [{ "scroll-pb": E() }],
			"scroll-pl": [{ "scroll-pl": E() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			fill: [{ fill: ["none", ...R()] }],
			"stroke-w": [{ stroke: [
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			stroke: [{ stroke: ["none", ...R()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
function cn(...e) {
	return twMerge(clsx(e));
}
var falsyToString = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e;
const cx = clsx, cva = (e, n) => (i) => {
	if (n?.variants == null) return cx(e, i?.class, i?.className);
	let { variants: a, defaultVariants: o } = n, s = Object.keys(a).map((e) => {
		let n = i?.[e], s = o?.[e];
		if (n === null) return null;
		let c = falsyToString(n) || falsyToString(s);
		return a[e][c];
	}), c = i && Object.entries(i).reduce((e, n) => {
		let [i, a] = n;
		return a === void 0 || (e[i] = a), e;
	}, {});
	return cx(e, s, n?.compoundVariants?.reduce((e, n) => {
		let { class: i, className: a, ...s } = n;
		return Object.entries(s).every((e) => {
			let [n, i] = e;
			return Array.isArray(i) ? i.includes({
				...o,
				...c
			}[n]) : {
				...o,
				...c
			}[n] === i;
		}) ? [
			...e,
			i,
			a
		] : e;
	}, []), i?.class, i?.className);
}, buttonVariants = cva([
	"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md font-medium",
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
	"disabled:pointer-events-none disabled:opacity-50",
	"aria-disabled:pointer-events-none aria-disabled:opacity-50",
	"transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out motion-reduce:transition-none"
], {
	variants: {
		variant: {
			flat: [
				"border border-border bg-surface-elevated text-text-primary",
				"hover:border-border-strong hover:bg-surface hover:text-text-primary",
				"active:scale-[0.98]"
			],
			raised: [
				"[background:var(--background-gradient-raised)] border border-transparent bg-surface text-text-primary",
				"shadow-[var(--shadow-button-raised)]",
				"hover:-translate-y-px hover:text-text-primary hover:shadow-[var(--shadow-button-raised-hover)]",
				"active:translate-y-0 active:scale-[0.99] active:shadow-[var(--shadow-button-inset)]"
			],
			inset: [
				"border border-transparent bg-surface text-text-primary",
				"shadow-[var(--shadow-button-inset)]",
				"hover:-translate-y-px hover:text-text-primary hover:shadow-[var(--shadow-button-raised-hover)]",
				"active:translate-y-px active:scale-[0.99] active:shadow-[var(--shadow-button-inset)]"
			],
			accent: [
				"border border-transparent bg-accent text-surface-elevated",
				"hover:bg-accent-hover hover:text-surface-elevated",
				"active:scale-[0.98]"
			],
			outline: [
				"border border-accent bg-transparent text-accent",
				"hover:bg-accent/10 hover:text-accent",
				"active:scale-[0.98]"
			],
			ghost: [
				"border border-transparent bg-transparent text-text-primary",
				"hover:bg-surface",
				"active:opacity-80"
			]
		},
		size: {
			xs: "h-7 px-2 text-xs",
			sm: "h-8 px-3 text-sm",
			default: "h-9 px-4 text-sm",
			lg: "h-10 px-5 text-base",
			icon: "size-8 shrink-0 gap-0 p-0"
		}
	},
	compoundVariants: [{
		size: "icon",
		variant: "accent",
		class: "rounded-md active:scale-[0.98]"
	}],
	defaultVariants: {
		variant: "flat",
		size: "default"
	}
});
var Button = React$1.forwardRef(({ className: e, variant: n, size: i, asChild: a = !1, type: o = "button", ...s }, c) => /* @__PURE__ */ jsx(a ? Slot$2 : "button", {
	ref: c,
	type: a ? void 0 : o,
	"data-variant": n,
	"data-size": i,
	className: cn(buttonVariants({
		variant: n,
		size: i
	}), e),
	...s
}));
Button.displayName = "Button";
var ButtonLink = React$1.forwardRef(({ className: e, variant: n, size: i, external: a, href: o, target: s, rel: c, "aria-disabled": l, ...u }, d) => {
	let p = a ?? (typeof o == "string" && /^https?:\/\//.test(o)), m = l === !0 || l === "true";
	return /* @__PURE__ */ jsx("a", {
		ref: d,
		href: m ? void 0 : o,
		target: p ? "_blank" : s,
		rel: p ? [
			c,
			"noopener",
			"noreferrer"
		].filter(Boolean).join(" ") : c,
		"aria-disabled": l,
		tabIndex: m ? -1 : u.tabIndex,
		"data-variant": n,
		"data-size": i,
		className: cn(buttonVariants({
			variant: n,
			size: i
		}), m && "pointer-events-none opacity-50", e),
		onClick: m ? (e) => {
			e.preventDefault(), u.onClick?.(e);
		} : u.onClick,
		...u
	});
});
ButtonLink.displayName = "ButtonLink";
const cardVariants = cva("group/card flex flex-col overflow-hidden rounded-lg text-sm text-text-primary", {
	variants: {
		variant: {
			flat: "border border-border bg-surface-elevated",
			raised: ["[background:var(--background-gradient-raised)] shadow-[var(--shadow-card-raised)]"],
			inset: "bg-surface shadow-[var(--shadow-card-inset)]"
		},
		size: {
			default: "gap-6 py-6",
			sm: "gap-4 py-4"
		}
	},
	defaultVariants: {
		variant: "flat",
		size: "default"
	}
}), cardFooterAlign = {
	end: "justify-end",
	center: "justify-center",
	start: "justify-start"
};
var cardSectionX = "px-6 group-data-[size=sm]/card:px-4";
function Card({ className: e, variant: n, size: i, ...a }) {
	return /* @__PURE__ */ jsx("div", {
		"data-variant": n,
		"data-size": i,
		className: cn(cardVariants({
			variant: n,
			size: i
		}), e),
		...a
	});
}
function CardHeader({ className: e, action: n, children: i, ...a }) {
	return n ? /* @__PURE__ */ jsx("div", {
		className: cn(cardSectionX, e),
		...a,
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex min-w-0 flex-col gap-1",
				children: i
			}), /* @__PURE__ */ jsx("div", {
				className: "self-start justify-self-end",
				children: n
			})]
		})
	}) : /* @__PURE__ */ jsx("div", {
		className: cn("flex flex-col gap-1", cardSectionX, e),
		...a,
		children: i
	});
}
function CardTitle({ className: e, as: n = "h3", ...i }) {
	return /* @__PURE__ */ jsx(n, {
		className: cn("text-base font-medium leading-snug text-text-primary group-data-[size=sm]/card:text-sm", e),
		...i
	});
}
function CardDescription({ className: e, ...n }) {
	return /* @__PURE__ */ jsx("p", {
		className: cn("text-sm text-text-muted", e),
		...n
	});
}
function CardContent({ className: e, ...n }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn(cardSectionX, e),
		...n
	});
}
function CardFooter({ className: e, align: n = "start", ...i }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex flex-wrap items-center gap-3", cardSectionX, cardFooterAlign[n], e),
		...i
	});
}
function CardMedia({ className: e, ...n }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("-mt-6 w-full overflow-hidden group-data-[size=sm]/card:-mt-4", "[&_img]:block [&_img]:size-full [&_img]:object-cover", "rounded-t-lg", e),
		...n
	});
}
/**
* @license lucide-react v1.17.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...e) => e.filter((e, n, i) => !!e && e.trim() !== "" && i.indexOf(e) === n).join(" ").trim(), toKebabCase = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), toCamelCase = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, n, i) => i ? i.toUpperCase() : n.toLowerCase()), toPascalCase = (e) => {
	let n = toCamelCase(e);
	return n.charAt(0).toUpperCase() + n.slice(1);
}, defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, hasA11yProp = (e) => {
	for (let n in e) if (n.startsWith("aria-") || n === "role" || n === "title") return !0;
	return !1;
}, LucideContext = createContext({}), useLucideContext = () => useContext(LucideContext), Icon$1 = forwardRef(({ color: e, size: n, strokeWidth: i, absoluteStrokeWidth: o, className: s = "", children: c, iconNode: l, ...u }, d) => {
	let { size: f = 24, strokeWidth: p = 2, absoluteStrokeWidth: m = !1, color: h = "currentColor", className: g = "" } = useLucideContext() ?? {}, _ = o ?? m ? Number(i ?? p) * 24 / Number(n ?? f) : i ?? p;
	return createElement("svg", {
		ref: d,
		...defaultAttributes,
		width: n ?? f ?? defaultAttributes.width,
		height: n ?? f ?? defaultAttributes.height,
		stroke: e ?? h,
		strokeWidth: _,
		className: mergeClasses("lucide", g, s),
		...!c && !hasA11yProp(u) && { "aria-hidden": "true" },
		...u
	}, [...l.map(([e, n]) => createElement(e, n)), ...Array.isArray(c) ? c : [c]]);
}), createLucideIcon = (e, n) => {
	let i = forwardRef(({ className: i, ...o }, s) => createElement(Icon$1, {
		ref: s,
		iconNode: n,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(e))}`, `lucide-${e}`, i),
		...o
	}));
	return i.displayName = toPascalCase(e), i;
}, Check = createLucideIcon("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), ChevronDown = createLucideIcon("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), EyeOff = createLucideIcon("eye-off", [
	["path", {
		d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
		key: "ct8e1f"
	}],
	["path", {
		d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
		key: "151rxh"
	}],
	["path", {
		d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
		key: "13bj9a"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]), Eye = createLucideIcon("eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]), X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
const fieldVariants = cva([
	"flex h-9 w-full min-w-0 items-center gap-2 rounded-md px-3 text-sm text-text-primary",
	"focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-surface",
	"has-disabled:cursor-not-allowed has-disabled:opacity-50",
	"transition-[box-shadow,border-color,background-color,color] duration-200 ease-out motion-reduce:transition-none"
], {
	variants: {
		variant: {
			border: "border border-border bg-surface-elevated hover:border-border-strong focus-within:border-border-strong focus-within:ring-ring/40",
			inset: "border border-transparent bg-surface shadow-[var(--shadow-button-inset)] focus-within:shadow-[var(--shadow-button-raised-hover)] focus-within:ring-ring/40",
			filled: "border border-transparent bg-surface text-text-primary hover:bg-surface-elevated focus-within:ring-ring/40"
		},
		invalid: {
			true: "",
			false: ""
		}
	},
	compoundVariants: [
		{
			invalid: !0,
			variant: "border",
			class: "border-error hover:border-error focus-within:border-error focus-within:ring-error/40"
		},
		{
			invalid: !0,
			variant: "inset",
			class: "border-error shadow-[var(--shadow-button-inset)] focus-within:border-error focus-within:shadow-[var(--shadow-button-inset)] focus-within:ring-error/40"
		},
		{
			invalid: !0,
			variant: "filled",
			class: "border border-error hover:bg-surface focus-within:ring-error/40"
		}
	],
	defaultVariants: {
		variant: "border",
		invalid: !1
	}
});
var Input = React$1.forwardRef(({ className: e, variant: n, mode: i = "default", showPasswordToggle: a = !1, errorMessage: o, type: s = "text", id: l, ...d }, m) => {
	let h = useId(), g = l ?? h, _ = `${g}-error`, v = !!o, y = i === "search", b = s === "password", [x, S] = useState(!1), C = b && a, w = C && x ? "text" : s ?? "text";
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full flex-col gap-1.5",
		children: [/* @__PURE__ */ jsxs("div", {
			"data-variant": n,
			"data-mode": i,
			"data-invalid": v || void 0,
			className: cn(fieldVariants({
				variant: n,
				invalid: v
			}), e),
			children: [
				y ? /* @__PURE__ */ jsx(Search, {
					className: "size-4 shrink-0 text-text-muted",
					"aria-hidden": !0
				}) : null,
				/* @__PURE__ */ jsx("input", {
					ref: m,
					id: g,
					type: w,
					"aria-invalid": v || void 0,
					"aria-describedby": v ? _ : void 0,
					className: cn("w-full bg-transparent text-sm text-text-primary placeholder:text-text-subtle", "outline-none disabled:cursor-not-allowed", C ? "pr-1" : ""),
					...d
				}),
				C ? /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "inline-flex size-5 shrink-0 items-center justify-center text-text-muted hover:text-text-primary",
					onClick: () => S((e) => !e),
					"aria-label": x ? "Hide password" : "Show password",
					children: jsx(x ? EyeOff : Eye, {
						className: "size-4",
						"aria-hidden": !0
					})
				}) : null
			]
		}), o ? /* @__PURE__ */ jsx("p", {
			id: _,
			role: "alert",
			className: "text-xs text-error",
			children: o
		}) : null]
	});
});
Input.displayName = "Input";
const labelVariants = cva("inline-flex cursor-pointer items-center gap-1 font-medium text-text-primary", {
	variants: { size: {
		sm: "text-xs",
		default: "text-sm"
	} },
	defaultVariants: { size: "default" }
});
var Label = React$1.forwardRef(({ size: e, children: n, htmlFor: i, required: a = !1, ...o }, s) => /* @__PURE__ */ jsxs("label", {
	ref: s,
	htmlFor: i,
	className: labelVariants({ size: e }),
	...o,
	children: [/* @__PURE__ */ jsx("span", { children: n }), a ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("span", {
		className: "text-error",
		"aria-hidden": !0,
		children: "*"
	}) }) : null]
}));
Label.displayName = "Label", typeof window < "u" && window.document && window.document.createElement;
function composeEventHandlers(e, n, { checkForDefaultPrevented: i = !0 } = {}) {
	return function(a) {
		if (e?.(a), i === !1 || !a.defaultPrevented) return n?.(a);
	};
}
function createContext2(n, i) {
	let a = React$1.createContext(i), o = (n) => {
		let { children: i, ...o } = n, s = React$1.useMemo(() => o, Object.values(o));
		return /* @__PURE__ */ jsx(a.Provider, {
			value: s,
			children: i
		});
	};
	o.displayName = n + "Provider";
	function s(o) {
		let s = React$1.useContext(a);
		if (s) return s;
		if (i !== void 0) return i;
		throw Error(`\`${o}\` must be used within \`${n}\``);
	}
	return [o, s];
}
function createContextScope(n, i = []) {
	let a = [];
	function o(i, o) {
		let s = React$1.createContext(o), c = a.length;
		a = [...a, o];
		let l = (i) => {
			let { scope: a, children: o, ...l } = i, u = a?.[n]?.[c] || s, d = React$1.useMemo(() => l, Object.values(l));
			return /* @__PURE__ */ jsx(u.Provider, {
				value: d,
				children: o
			});
		};
		l.displayName = i + "Provider";
		function u(a, l) {
			let u = l?.[n]?.[c] || s, d = React$1.useContext(u);
			if (d) return d;
			if (o !== void 0) return o;
			throw Error(`\`${a}\` must be used within \`${i}\``);
		}
		return [l, u];
	}
	let s = () => {
		let i = a.map((n) => React$1.createContext(n));
		return function(a) {
			let o = a?.[n] || i;
			return React$1.useMemo(() => ({ [`__scope${n}`]: {
				...a,
				[n]: o
			} }), [a, o]);
		};
	};
	return s.scopeName = n, [o, composeContextScopes(s, ...i)];
}
function composeContextScopes(...n) {
	let i = n[0];
	if (n.length === 1) return i;
	let a = () => {
		let a = n.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(n) {
			let o = a.reduce((e, { useScope: i, scopeName: a }) => {
				let o = i(n)[`__scope${a}`];
				return {
					...e,
					...o
				};
			}, {});
			return React$1.useMemo(() => ({ [`__scope${i.scopeName}`]: o }), [o]);
		};
	};
	return a.scopeName = i.scopeName, a;
}
var useLayoutEffect2 = globalThis?.document ? React$1.useLayoutEffect : () => {}, useReactId = React$1.useId || (() => void 0), count$1 = 0;
function useId$1(n) {
	let [i, a] = React$1.useState(useReactId());
	return useLayoutEffect2(() => {
		n || a((e) => e ?? String(count$1++));
	}, [n]), n || (i ? `radix-${i}` : "");
}
var useInsertionEffect = React$1.useInsertionEffect || useLayoutEffect2;
function useControllableState({ prop: n, defaultProp: i, onChange: a = () => {}, caller: o }) {
	let [s, c, l] = useUncontrolledState({
		defaultProp: i,
		onChange: a
	}), u = n !== void 0, d = u ? n : s;
	{
		let i = React$1.useRef(n !== void 0);
		React$1.useEffect(() => {
			let e = i.current;
			if (e !== u) {
				let n = e ? "controlled" : "uncontrolled", i = u ? "controlled" : "uncontrolled";
				console.warn(`${o} is changing from ${n} to ${i}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
			}
			i.current = u;
		}, [u, o]);
	}
	return [d, React$1.useCallback((e) => {
		if (u) {
			let i = isFunction(e) ? e(n) : e;
			i !== n && l.current?.(i);
		} else c(e);
	}, [
		u,
		n,
		c,
		l
	])];
}
function useUncontrolledState({ defaultProp: n, onChange: i }) {
	let [a, o] = React$1.useState(n), s = React$1.useRef(a), c = React$1.useRef(i);
	return useInsertionEffect(() => {
		c.current = i;
	}, [i]), React$1.useEffect(() => {
		s.current !== a && (c.current?.(a), s.current = a);
	}, [a, s]), [
		a,
		o,
		c
	];
}
function isFunction(e) {
	return typeof e == "function";
}
/* @__NO_SIDE_EFFECTS__ */
function createSlot(n) {
	let i = /* @__PURE__ */ createSlotClone(n), a = React$1.forwardRef((n, a) => {
		let { children: o, ...s } = n, c = React$1.Children.toArray(o), l = c.find(isSlottable);
		if (l) {
			let n = l.props.children, o = c.map((i) => i === l ? React$1.Children.count(n) > 1 ? React$1.Children.only(null) : React$1.isValidElement(n) ? n.props.children : null : i);
			return /* @__PURE__ */ jsx(i, {
				...s,
				ref: a,
				children: React$1.isValidElement(n) ? React$1.cloneElement(n, void 0, o) : null
			});
		}
		return /* @__PURE__ */ jsx(i, {
			...s,
			ref: a,
			children: o
		});
	});
	return a.displayName = `${n}.Slot`, a;
}
/* @__NO_SIDE_EFFECTS__ */
function createSlotClone(n) {
	let i = React$1.forwardRef((n, i) => {
		let { children: a, ...o } = n;
		if (React$1.isValidElement(a)) {
			let n = getElementRef$1(a), s = mergeProps(o, a.props);
			return a.type !== React$1.Fragment && (s.ref = i ? composeRefs(i, n) : n), React$1.cloneElement(a, s);
		}
		return React$1.Children.count(a) > 1 ? React$1.Children.only(null) : null;
	});
	return i.displayName = `${n}.SlotClone`, i;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(n) {
	return React$1.isValidElement(n) && typeof n.type == "function" && "__radixId" in n.type && n.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(e, n) {
	let i = { ...n };
	for (let a in n) {
		let o = e[a], s = n[a];
		/^on[A-Z]/.test(a) ? o && s ? i[a] = (...e) => {
			let n = s(...e);
			return o(...e), n;
		} : o && (i[a] = o) : a === "style" ? i[a] = {
			...o,
			...s
		} : a === "className" && (i[a] = [o, s].filter(Boolean).join(" "));
	}
	return {
		...e,
		...i
	};
}
function getElementRef$1(e) {
	let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
	return i ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? e.props.ref : e.props.ref || e.ref);
}
var Primitive = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((n, i) => {
	let a = /* @__PURE__ */ createSlot(`Primitive.${i}`), o = React$1.forwardRef((e, n) => {
		let { asChild: o, ...s } = e, c = o ? a : i;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ jsx(c, {
			...s,
			ref: n
		});
	});
	return o.displayName = `Primitive.${i}`, {
		...n,
		[i]: o
	};
}, {});
function dispatchDiscreteCustomEvent(e, n) {
	e && ReactDOM$1.flushSync(() => e.dispatchEvent(n));
}
function useCallbackRef(n) {
	let i = React$1.useRef(n);
	return React$1.useEffect(() => {
		i.current = n;
	}), React$1.useMemo(() => (...e) => i.current?.(...e), []);
}
function useEscapeKeydown(n, i = globalThis?.document) {
	let a = useCallbackRef(n);
	React$1.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && a(e);
		};
		return i.addEventListener("keydown", e, { capture: !0 }), () => i.removeEventListener("keydown", e, { capture: !0 });
	}, [a, i]);
}
var DISMISSABLE_LAYER_NAME = "DismissableLayer", CONTEXT_UPDATE = "dismissableLayer.update", POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside", FOCUS_OUTSIDE = "dismissableLayer.focusOutside", originalBodyPointerEvents, DismissableLayerContext = React$1.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
}), DismissableLayer = React$1.forwardRef((n, i) => {
	let { disableOutsidePointerEvents: a = !1, onEscapeKeyDown: o, onPointerDownOutside: s, onFocusOutside: c, onInteractOutside: l, onDismiss: u, ...d } = n, p = React$1.useContext(DismissableLayerContext), [m, h] = React$1.useState(null), g = m?.ownerDocument ?? globalThis?.document, [, _] = React$1.useState({}), y = useComposedRefs(i, (e) => h(e)), b = Array.from(p.layers), [x] = [...p.layersWithOutsidePointerEventsDisabled].slice(-1), S = b.indexOf(x), C = m ? b.indexOf(m) : -1, w = p.layersWithOutsidePointerEventsDisabled.size > 0, T = C >= S, E = usePointerDownOutside((e) => {
		let n = e.target, i = [...p.branches].some((e) => e.contains(n));
		!T || i || (s?.(e), l?.(e), e.defaultPrevented || u?.());
	}, g), D = useFocusOutside((e) => {
		let n = e.target;
		[...p.branches].some((e) => e.contains(n)) || (c?.(e), l?.(e), e.defaultPrevented || u?.());
	}, g);
	return useEscapeKeydown((e) => {
		C === p.layers.size - 1 && (o?.(e), !e.defaultPrevented && u && (e.preventDefault(), u()));
	}, g), React$1.useEffect(() => {
		if (m) return a && (p.layersWithOutsidePointerEventsDisabled.size === 0 && (originalBodyPointerEvents = g.body.style.pointerEvents, g.body.style.pointerEvents = "none"), p.layersWithOutsidePointerEventsDisabled.add(m)), p.layers.add(m), dispatchUpdate(), () => {
			a && p.layersWithOutsidePointerEventsDisabled.size === 1 && (g.body.style.pointerEvents = originalBodyPointerEvents);
		};
	}, [
		m,
		g,
		a,
		p
	]), React$1.useEffect(() => () => {
		m && (p.layers.delete(m), p.layersWithOutsidePointerEventsDisabled.delete(m), dispatchUpdate());
	}, [m, p]), React$1.useEffect(() => {
		let e = () => _({});
		return document.addEventListener(CONTEXT_UPDATE, e), () => document.removeEventListener(CONTEXT_UPDATE, e);
	}, []), /* @__PURE__ */ jsx(Primitive.div, {
		...d,
		ref: y,
		style: {
			pointerEvents: w ? T ? "auto" : "none" : void 0,
			...n.style
		},
		onFocusCapture: composeEventHandlers(n.onFocusCapture, D.onFocusCapture),
		onBlurCapture: composeEventHandlers(n.onBlurCapture, D.onBlurCapture),
		onPointerDownCapture: composeEventHandlers(n.onPointerDownCapture, E.onPointerDownCapture)
	});
});
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch", DismissableLayerBranch = React$1.forwardRef((n, i) => {
	let a = React$1.useContext(DismissableLayerContext), o = React$1.useRef(null), s = useComposedRefs(i, o);
	return React$1.useEffect(() => {
		let e = o.current;
		if (e) return a.branches.add(e), () => {
			a.branches.delete(e);
		};
	}, [a.branches]), /* @__PURE__ */ jsx(Primitive.div, {
		...n,
		ref: s
	});
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(n, i = globalThis?.document) {
	let a = useCallbackRef(n), o = React$1.useRef(!1), s = React$1.useRef(() => {});
	return React$1.useEffect(() => {
		let e = (e) => {
			if (e.target && !o.current) {
				let n = function() {
					handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, a, o, { discrete: !0 });
				}, o = { originalEvent: e };
				e.pointerType === "touch" ? (i.removeEventListener("click", s.current), s.current = n, i.addEventListener("click", s.current, { once: !0 })) : n();
			} else i.removeEventListener("click", s.current);
			o.current = !1;
		}, n = window.setTimeout(() => {
			i.addEventListener("pointerdown", e);
		}, 0);
		return () => {
			window.clearTimeout(n), i.removeEventListener("pointerdown", e), i.removeEventListener("click", s.current);
		};
	}, [i, a]), { onPointerDownCapture: () => o.current = !0 };
}
function useFocusOutside(n, i = globalThis?.document) {
	let a = useCallbackRef(n), o = React$1.useRef(!1);
	return React$1.useEffect(() => {
		let e = (e) => {
			e.target && !o.current && handleAndDispatchCustomEvent(FOCUS_OUTSIDE, a, { originalEvent: e }, { discrete: !1 });
		};
		return i.addEventListener("focusin", e), () => i.removeEventListener("focusin", e);
	}, [i, a]), {
		onFocusCapture: () => o.current = !0,
		onBlurCapture: () => o.current = !1
	};
}
function dispatchUpdate() {
	let e = new CustomEvent(CONTEXT_UPDATE);
	document.dispatchEvent(e);
}
function handleAndDispatchCustomEvent(e, n, i, { discrete: a }) {
	let o = i.originalEvent.target, s = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: i
	});
	n && o.addEventListener(e, n, { once: !0 }), a ? dispatchDiscreteCustomEvent(o, s) : o.dispatchEvent(s);
}
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount", AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount", EVENT_OPTIONS = {
	bubbles: !1,
	cancelable: !0
}, FOCUS_SCOPE_NAME = "FocusScope", FocusScope = React$1.forwardRef((n, i) => {
	let { loop: a = !1, trapped: o = !1, onMountAutoFocus: s, onUnmountAutoFocus: c, ...l } = n, [u, d] = React$1.useState(null), p = useCallbackRef(s), m = useCallbackRef(c), h = React$1.useRef(null), g = useComposedRefs(i, (e) => d(e)), _ = React$1.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	React$1.useEffect(() => {
		if (o) {
			let e = function(e) {
				if (_.paused || !u) return;
				let n = e.target;
				u.contains(n) ? h.current = n : focus(h.current, { select: !0 });
			}, n = function(e) {
				if (_.paused || !u) return;
				let n = e.relatedTarget;
				n !== null && (u.contains(n) || focus(h.current, { select: !0 }));
			}, i = function(e) {
				if (document.activeElement === document.body) for (let n of e) n.removedNodes.length > 0 && focus(u);
			};
			document.addEventListener("focusin", e), document.addEventListener("focusout", n);
			let a = new MutationObserver(i);
			return u && a.observe(u, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", n), a.disconnect();
			};
		}
	}, [
		o,
		u,
		_.paused
	]), React$1.useEffect(() => {
		if (u) {
			focusScopesStack.add(_);
			let e = document.activeElement;
			if (!u.contains(e)) {
				let n = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
				u.addEventListener(AUTOFOCUS_ON_MOUNT, p), u.dispatchEvent(n), n.defaultPrevented || (focusFirst(removeLinks(getTabbableCandidates(u)), { select: !0 }), document.activeElement === e && focus(u));
			}
			return () => {
				u.removeEventListener(AUTOFOCUS_ON_MOUNT, p), setTimeout(() => {
					let n = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
					u.addEventListener(AUTOFOCUS_ON_UNMOUNT, m), u.dispatchEvent(n), n.defaultPrevented || focus(e ?? document.body, { select: !0 }), u.removeEventListener(AUTOFOCUS_ON_UNMOUNT, m), focusScopesStack.remove(_);
				}, 0);
			};
		}
	}, [
		u,
		p,
		m,
		_
	]);
	let y = React$1.useCallback((e) => {
		if (!a && !o || _.paused) return;
		let n = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, i = document.activeElement;
		if (n && i) {
			let n = e.currentTarget, [o, s] = getTabbableEdges(n);
			o && s ? !e.shiftKey && i === s ? (e.preventDefault(), a && focus(o, { select: !0 })) : e.shiftKey && i === o && (e.preventDefault(), a && focus(s, { select: !0 })) : i === n && e.preventDefault();
		}
	}, [
		a,
		o,
		_.paused
	]);
	return /* @__PURE__ */ jsx(Primitive.div, {
		tabIndex: -1,
		...l,
		ref: g,
		onKeyDown: y
	});
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst(e, { select: n = !1 } = {}) {
	let i = document.activeElement;
	for (let a of e) if (focus(a, { select: n }), document.activeElement !== i) return;
}
function getTabbableEdges(e) {
	let n = getTabbableCandidates(e);
	return [findVisible(n, e), findVisible(n.reverse(), e)];
}
function getTabbableCandidates(e) {
	let n = [], i = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let n = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || n ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; i.nextNode();) n.push(i.currentNode);
	return n;
}
function findVisible(e, n) {
	for (let i of e) if (!isHidden(i, { upTo: n })) return i;
}
function isHidden(e, { upTo: n }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (n !== void 0 && e === n) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function isSelectableInput(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function focus(e, { select: n = !1 } = {}) {
	if (e && e.focus) {
		let i = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== i && isSelectableInput(e) && n && e.select();
	}
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
	let e = [];
	return {
		add(n) {
			let i = e[0];
			n !== i && i?.pause(), e = arrayRemove(e, n), e.unshift(n);
		},
		remove(n) {
			e = arrayRemove(e, n), e[0]?.resume();
		}
	};
}
function arrayRemove(e, n) {
	let i = [...e], a = i.indexOf(n);
	return a !== -1 && i.splice(a, 1), i;
}
function removeLinks(e) {
	return e.filter((e) => e.tagName !== "A");
}
var PORTAL_NAME$2 = "Portal", Portal = React$1.forwardRef((n, i) => {
	let { container: a, ...o } = n, [s, c] = React$1.useState(!1);
	useLayoutEffect2(() => c(!0), []);
	let l = a || s && globalThis?.document?.body;
	return l ? ReactDOM.createPortal(/* @__PURE__ */ jsx(Primitive.div, {
		...o,
		ref: i
	}), l) : null;
});
Portal.displayName = PORTAL_NAME$2;
function useStateMachine(n, i) {
	return React$1.useReducer((e, n) => i[e][n] ?? e, n);
}
var Presence = (n) => {
	let { present: i, children: a } = n, o = usePresence(i), s = typeof a == "function" ? a({ present: o.isPresent }) : React$1.Children.only(a), c = useComposedRefs(o.ref, getElementRef(s));
	return typeof a == "function" || o.isPresent ? React$1.cloneElement(s, { ref: c }) : null;
};
Presence.displayName = "Presence";
function usePresence(n) {
	let [i, a] = React$1.useState(), o = React$1.useRef(null), s = React$1.useRef(n), c = React$1.useRef("none"), [l, u] = useStateMachine(n ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return React$1.useEffect(() => {
		let e = getAnimationName(o.current);
		c.current = l === "mounted" ? e : "none";
	}, [l]), useLayoutEffect2(() => {
		let e = o.current, i = s.current;
		if (i !== n) {
			let a = c.current, o = getAnimationName(e);
			n ? u("MOUNT") : o === "none" || e?.display === "none" ? u("UNMOUNT") : u(i && a !== o ? "ANIMATION_OUT" : "UNMOUNT"), s.current = n;
		}
	}, [n, u]), useLayoutEffect2(() => {
		if (i) {
			let e, n = i.ownerDocument.defaultView ?? window, a = (a) => {
				let c = getAnimationName(o.current).includes(CSS.escape(a.animationName));
				if (a.target === i && c && (u("ANIMATION_END"), !s.current)) {
					let a = i.style.animationFillMode;
					i.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						i.style.animationFillMode === "forwards" && (i.style.animationFillMode = a);
					});
				}
			}, l = (e) => {
				e.target === i && (c.current = getAnimationName(o.current));
			};
			return i.addEventListener("animationstart", l), i.addEventListener("animationcancel", a), i.addEventListener("animationend", a), () => {
				n.clearTimeout(e), i.removeEventListener("animationstart", l), i.removeEventListener("animationcancel", a), i.removeEventListener("animationend", a);
			};
		} else u("ANIMATION_END");
	}, [i, u]), {
		isPresent: ["mounted", "unmountSuspended"].includes(l),
		ref: React$1.useCallback((e) => {
			o.current = e ? getComputedStyle(e) : null, a(e);
		}, [])
	};
}
function getAnimationName(e) {
	return e?.animationName || "none";
}
function getElementRef(e) {
	let n = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning;
	return i ? e.ref : (n = Object.getOwnPropertyDescriptor(e, "ref")?.get, i = n && "isReactWarning" in n && n.isReactWarning, i ? e.props.ref : e.props.ref || e.ref);
}
var count = 0;
function useFocusGuards() {
	React$1.useEffect(() => {
		let e = document.querySelectorAll("[data-radix-focus-guard]");
		return document.body.insertAdjacentElement("afterbegin", e[0] ?? createFocusGuard()), document.body.insertAdjacentElement("beforeend", e[1] ?? createFocusGuard()), count++, () => {
			count === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), count--;
		};
	}, []);
}
function createFocusGuard() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var __assign = function() {
	return __assign = Object.assign || function(e) {
		for (var n, i = 1, a = arguments.length; i < a; i++) for (var o in n = arguments[i], n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
		return e;
	}, __assign.apply(this, arguments);
};
function __rest(e, n) {
	var i = {};
	for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && n.indexOf(a) < 0 && (i[a] = e[a]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var o = 0, a = Object.getOwnPropertySymbols(e); o < a.length; o++) n.indexOf(a[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, a[o]) && (i[a[o]] = e[a[o]]);
	return i;
}
function __spreadArray(e, n, i) {
	if (i || arguments.length === 2) for (var a = 0, o = n.length, s; a < o; a++) (s || !(a in n)) && (s ||= Array.prototype.slice.call(n, 0, a), s[a] = n[a]);
	return e.concat(s || Array.prototype.slice.call(n));
}
var zeroRightClassName = "right-scroll-bar-position", fullWidthClassName = "width-before-scroll-bar", noScrollbarsClassName = "with-scroll-bars-hidden", removedBarSizeVariable = "--removed-body-scroll-bar-size";
function assignRef(e, n) {
	return typeof e == "function" ? e(n) : e && (e.current = n), e;
}
function useCallbackRef$1(e, n) {
	var i = useState(function() {
		return {
			value: e,
			callback: n,
			facade: {
				get current() {
					return i.value;
				},
				set current(e) {
					var n = i.value;
					n !== e && (i.value = e, i.callback(e, n));
				}
			}
		};
	})[0];
	return i.callback = n, i.facade;
}
var useIsomorphicLayoutEffect = typeof window < "u" ? React$1.useLayoutEffect : React$1.useEffect, currentValues = /* @__PURE__ */ new WeakMap();
function useMergeRefs(e, n) {
	var i = useCallbackRef$1(n || null, function(n) {
		return e.forEach(function(e) {
			return assignRef(e, n);
		});
	});
	return useIsomorphicLayoutEffect(function() {
		var n = currentValues.get(i);
		if (n) {
			var a = new Set(n), o = new Set(e), s = i.current;
			a.forEach(function(e) {
				o.has(e) || assignRef(e, null);
			}), o.forEach(function(e) {
				a.has(e) || assignRef(e, s);
			});
		}
		currentValues.set(i, e);
	}, [e]), i;
}
function ItoI(e) {
	return e;
}
function innerCreateMedium(e, n) {
	n === void 0 && (n = ItoI);
	var i = [], a = !1;
	return {
		read: function() {
			if (a) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return i.length ? i[i.length - 1] : e;
		},
		useMedium: function(e) {
			var o = n(e, a);
			return i.push(o), function() {
				i = i.filter(function(e) {
					return e !== o;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (a = !0; i.length;) {
				var n = i;
				i = [], n.forEach(e);
			}
			i = {
				push: function(n) {
					return e(n);
				},
				filter: function() {
					return i;
				}
			};
		},
		assignMedium: function(e) {
			a = !0;
			var n = [];
			if (i.length) {
				var o = i;
				i = [], o.forEach(e), n = i;
			}
			var s = function() {
				var i = n;
				n = [], i.forEach(e);
			}, c = function() {
				return Promise.resolve().then(s);
			};
			c(), i = {
				push: function(e) {
					n.push(e), c();
				},
				filter: function(e) {
					return n = n.filter(e), i;
				}
			};
		}
	};
}
function createSidecarMedium(e) {
	e === void 0 && (e = {});
	var n = innerCreateMedium(null);
	return n.options = __assign({
		async: !0,
		ssr: !1
	}, e), n;
}
var SideCar = function(n) {
	var i = n.sideCar, a = __rest(n, ["sideCar"]);
	if (!i) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var o = i.read();
	if (!o) throw Error("Sidecar medium not found");
	return React$1.createElement(o, __assign({}, a));
};
SideCar.isSideCarExport = !0;
function exportSidecar(e, n) {
	return e.useMedium(n), SideCar;
}
var effectCar = createSidecarMedium(), nothing = function() {}, RemoveScroll = React$1.forwardRef(function(n, i) {
	var a = React$1.useRef(null), o = React$1.useState({
		onScrollCapture: nothing,
		onWheelCapture: nothing,
		onTouchMoveCapture: nothing
	}), s = o[0], c = o[1], l = n.forwardProps, u = n.children, d = n.className, f = n.removeScrollBar, p = n.enabled, m = n.shards, h = n.sideCar, g = n.noRelative, _ = n.noIsolation, v = n.inert, y = n.allowPinchZoom, b = n.as, x = b === void 0 ? "div" : b, S = n.gapMode, C = __rest(n, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), w = h, T = useMergeRefs([a, i]), E = __assign(__assign({}, C), s);
	return React$1.createElement(React$1.Fragment, null, p && React$1.createElement(w, {
		sideCar: effectCar,
		removeScrollBar: f,
		shards: m,
		noRelative: g,
		noIsolation: _,
		inert: v,
		setCallbacks: c,
		allowPinchZoom: !!y,
		lockRef: a,
		gapMode: S
	}), l ? React$1.cloneElement(React$1.Children.only(u), __assign(__assign({}, E), { ref: T })) : React$1.createElement(x, __assign({}, E, {
		className: d,
		ref: T
	}), u));
});
RemoveScroll.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, RemoveScroll.classNames = {
	fullWidth: fullWidthClassName,
	zeroRight: zeroRightClassName
};
var currentNonce, getNonce = function() {
	if (currentNonce) return currentNonce;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function makeStyleTag() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var n = getNonce();
	return n && e.setAttribute("nonce", n), e;
}
function injectStyles(e, n) {
	e.styleSheet ? e.styleSheet.cssText = n : e.appendChild(document.createTextNode(n));
}
function insertStyleTag(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var stylesheetSingleton = function() {
	var e = 0, n = null;
	return {
		add: function(i) {
			e == 0 && (n = makeStyleTag()) && (injectStyles(n, i), insertStyleTag(n)), e++;
		},
		remove: function() {
			e--, !e && n && (n.parentNode && n.parentNode.removeChild(n), n = null);
		}
	};
}, styleHookSingleton = function() {
	var n = stylesheetSingleton();
	return function(i, a) {
		React$1.useEffect(function() {
			return n.add(i), function() {
				n.remove();
			};
		}, [i && a]);
	};
}, styleSingleton = function() {
	var e = styleHookSingleton();
	return function(n) {
		var i = n.styles, a = n.dynamic;
		return e(i, a), null;
	};
}, zeroGap = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, parse = function(e) {
	return parseInt(e || "", 10) || 0;
}, getOffset = function(e) {
	var n = window.getComputedStyle(document.body), i = n[e === "padding" ? "paddingLeft" : "marginLeft"], a = n[e === "padding" ? "paddingTop" : "marginTop"], o = n[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		parse(i),
		parse(a),
		parse(o)
	];
}, getGapWidth = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return zeroGap;
	var n = getOffset(e), i = document.documentElement.clientWidth, a = window.innerWidth;
	return {
		left: n[0],
		top: n[1],
		right: n[2],
		gap: Math.max(0, a - i + n[2] - n[0])
	};
}, Style = styleSingleton(), lockAttribute = "data-scroll-locked", getStyles = function(e, n, i, a) {
	var o = e.left, s = e.top, c = e.right, l = e.gap;
	return i === void 0 && (i = "margin"), `
  .${noScrollbarsClassName} {
   overflow: hidden ${a};
   padding-right: ${l}px ${a};
  }
  body[${lockAttribute}] {
    overflow: hidden ${a};
    overscroll-behavior: contain;
    ${[
		n && `position: relative ${a};`,
		i === "margin" && `
    padding-left: ${o}px;
    padding-top: ${s}px;
    padding-right: ${c}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${l}px ${a};
    `,
		i === "padding" && `padding-right: ${l}px ${a};`
	].filter(Boolean).join("")}
  }
  
  .${zeroRightClassName} {
    right: ${l}px ${a};
  }
  
  .${fullWidthClassName} {
    margin-right: ${l}px ${a};
  }
  
  .${zeroRightClassName} .${zeroRightClassName} {
    right: 0 ${a};
  }
  
  .${fullWidthClassName} .${fullWidthClassName} {
    margin-right: 0 ${a};
  }
  
  body[${lockAttribute}] {
    ${removedBarSizeVariable}: ${l}px;
  }
`;
}, getCurrentUseCounter = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, useLockAttribute = function() {
	React$1.useEffect(function() {
		return document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString()), function() {
			var e = getCurrentUseCounter() - 1;
			e <= 0 ? document.body.removeAttribute(lockAttribute) : document.body.setAttribute(lockAttribute, e.toString());
		};
	}, []);
}, RemoveScrollBar = function(n) {
	var i = n.noRelative, a = n.noImportant, o = n.gapMode, s = o === void 0 ? "margin" : o;
	useLockAttribute();
	var c = React$1.useMemo(function() {
		return getGapWidth(s);
	}, [s]);
	return React$1.createElement(Style, { styles: getStyles(c, !i, s, a ? "" : "!important") });
}, passiveSupported = !1;
if (typeof window < "u") try {
	var options = Object.defineProperty({}, "passive", { get: function() {
		return passiveSupported = !0, !0;
	} });
	window.addEventListener("test", options, options), window.removeEventListener("test", options, options);
} catch {
	passiveSupported = !1;
}
var nonPassive = passiveSupported ? { passive: !1 } : !1, alwaysContainsScroll = function(e) {
	return e.tagName === "TEXTAREA";
}, elementCanBeScrolled = function(e, n) {
	if (!(e instanceof Element)) return !1;
	var i = window.getComputedStyle(e);
	return i[n] !== "hidden" && !(i.overflowY === i.overflowX && !alwaysContainsScroll(e) && i[n] === "visible");
}, elementCouldBeVScrolled = function(e) {
	return elementCanBeScrolled(e, "overflowY");
}, elementCouldBeHScrolled = function(e) {
	return elementCanBeScrolled(e, "overflowX");
}, locationCouldBeScrolled = function(e, n) {
	var i = n.ownerDocument, a = n;
	do {
		if (typeof ShadowRoot < "u" && a instanceof ShadowRoot && (a = a.host), elementCouldBeScrolled(e, a)) {
			var o = getScrollVariables(e, a);
			if (o[1] > o[2]) return !0;
		}
		a = a.parentNode;
	} while (a && a !== i.body);
	return !1;
}, getVScrollVariables = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, getHScrollVariables = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, elementCouldBeScrolled = function(e, n) {
	return e === "v" ? elementCouldBeVScrolled(n) : elementCouldBeHScrolled(n);
}, getScrollVariables = function(e, n) {
	return e === "v" ? getVScrollVariables(n) : getHScrollVariables(n);
}, getDirectionFactor = function(e, n) {
	return e === "h" && n === "rtl" ? -1 : 1;
}, handleScroll = function(e, n, i, a, o) {
	var s = getDirectionFactor(e, window.getComputedStyle(n).direction), c = s * a, l = i.target, u = n.contains(l), d = !1, f = c > 0, p = 0, m = 0;
	do {
		if (!l) break;
		var h = getScrollVariables(e, l), g = h[0], _ = h[1] - h[2] - s * g;
		(g || _) && elementCouldBeScrolled(e, l) && (p += _, m += g);
		var v = l.parentNode;
		l = v && v.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? v.host : v;
	} while (!u && l !== document.body || u && (n.contains(l) || n === l));
	return (f && (o && Math.abs(p) < 1 || !o && c > p) || !f && (o && Math.abs(m) < 1 || !o && -c > m)) && (d = !0), d;
}, getTouchXY = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, getDeltaXY = function(e) {
	return [e.deltaX, e.deltaY];
}, extractRef = function(e) {
	return e && "current" in e ? e.current : e;
}, deltaCompare = function(e, n) {
	return e[0] === n[0] && e[1] === n[1];
}, generateStyle = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, idCounter = 0, lockStack = [];
function RemoveScrollSideCar(n) {
	var i = React$1.useRef([]), a = React$1.useRef([0, 0]), o = React$1.useRef(), s = React$1.useState(idCounter++)[0], c = React$1.useState(styleSingleton)[0], l = React$1.useRef(n);
	React$1.useEffect(function() {
		l.current = n;
	}, [n]), React$1.useEffect(function() {
		if (n.inert) {
			document.body.classList.add(`block-interactivity-${s}`);
			var e = __spreadArray([n.lockRef.current], (n.shards || []).map(extractRef), !0).filter(Boolean);
			return e.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${s}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${s}`), e.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${s}`);
				});
			};
		}
	}, [
		n.inert,
		n.lockRef.current,
		n.shards
	]);
	var u = React$1.useCallback(function(e, n) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !l.current.allowPinchZoom;
		var i = getTouchXY(e), s = a.current, c = "deltaX" in e ? e.deltaX : s[0] - i[0], u = "deltaY" in e ? e.deltaY : s[1] - i[1], d, f = e.target, p = Math.abs(c) > Math.abs(u) ? "h" : "v";
		if ("touches" in e && p === "h" && f.type === "range") return !1;
		var m = window.getSelection(), h = m && m.anchorNode;
		if (h && (h === f || h.contains(f))) return !1;
		var g = locationCouldBeScrolled(p, f);
		if (!g) return !0;
		if (g ? d = p : (d = p === "v" ? "h" : "v", g = locationCouldBeScrolled(p, f)), !g) return !1;
		if (!o.current && "changedTouches" in e && (c || u) && (o.current = d), !d) return !0;
		var _ = o.current || d;
		return handleScroll(_, n, e, _ === "h" ? c : u, !0);
	}, []), d = React$1.useCallback(function(e) {
		var n = e;
		if (!(!lockStack.length || lockStack[lockStack.length - 1] !== c)) {
			var a = "deltaY" in n ? getDeltaXY(n) : getTouchXY(n), o = i.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && deltaCompare(e.delta, a);
			})[0];
			if (o && o.should) {
				n.cancelable && n.preventDefault();
				return;
			}
			if (!o) {
				var s = (l.current.shards || []).map(extractRef).filter(Boolean).filter(function(e) {
					return e.contains(n.target);
				});
				(s.length > 0 ? u(n, s[0]) : !l.current.noIsolation) && n.cancelable && n.preventDefault();
			}
		}
	}, []), f = React$1.useCallback(function(e, n, a, o) {
		var s = {
			name: e,
			delta: n,
			target: a,
			should: o,
			shadowParent: getOutermostShadowParent(a)
		};
		i.current.push(s), setTimeout(function() {
			i.current = i.current.filter(function(e) {
				return e !== s;
			});
		}, 1);
	}, []), p = React$1.useCallback(function(e) {
		a.current = getTouchXY(e), o.current = void 0;
	}, []), m = React$1.useCallback(function(e) {
		f(e.type, getDeltaXY(e), e.target, u(e, n.lockRef.current));
	}, []), h = React$1.useCallback(function(e) {
		f(e.type, getTouchXY(e), e.target, u(e, n.lockRef.current));
	}, []);
	React$1.useEffect(function() {
		return lockStack.push(c), n.setCallbacks({
			onScrollCapture: m,
			onWheelCapture: m,
			onTouchMoveCapture: h
		}), document.addEventListener("wheel", d, nonPassive), document.addEventListener("touchmove", d, nonPassive), document.addEventListener("touchstart", p, nonPassive), function() {
			lockStack = lockStack.filter(function(e) {
				return e !== c;
			}), document.removeEventListener("wheel", d, nonPassive), document.removeEventListener("touchmove", d, nonPassive), document.removeEventListener("touchstart", p, nonPassive);
		};
	}, []);
	var g = n.removeScrollBar, _ = n.inert;
	return React$1.createElement(React$1.Fragment, null, _ ? React$1.createElement(c, { styles: generateStyle(s) }) : null, g ? React$1.createElement(RemoveScrollBar, {
		noRelative: n.noRelative,
		gapMode: n.gapMode
	}) : null);
}
function getOutermostShadowParent(e) {
	for (var n = null; e !== null;) e instanceof ShadowRoot && (n = e.host, e = e.host), e = e.parentNode;
	return n;
}
var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar), ReactRemoveScroll = React$1.forwardRef(function(n, i) {
	return React$1.createElement(RemoveScroll, __assign({}, n, {
		ref: i,
		sideCar: sidecar_default
	}));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var Combination_default = ReactRemoveScroll, getDefaultParent = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, counterMap = /* @__PURE__ */ new WeakMap(), uncontrolledNodes = /* @__PURE__ */ new WeakMap(), markerMap = {}, lockCount = 0, unwrapHost = function(e) {
	return e && (e.host || unwrapHost(e.parentNode));
}, correctTargets = function(e, n) {
	return n.map(function(n) {
		if (e.contains(n)) return n;
		var i = unwrapHost(n);
		return i && e.contains(i) ? i : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, applyAttributeToOthers = function(e, n, i, a) {
	var o = correctTargets(n, Array.isArray(e) ? e : [e]);
	markerMap[i] || (markerMap[i] = /* @__PURE__ */ new WeakMap());
	var s = markerMap[i], c = [], l = /* @__PURE__ */ new Set(), u = new Set(o), d = function(e) {
		!e || l.has(e) || (l.add(e), d(e.parentNode));
	};
	o.forEach(d);
	var f = function(e) {
		!e || u.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (l.has(e)) f(e);
			else try {
				var n = e.getAttribute(a), o = n !== null && n !== "false", u = (counterMap.get(e) || 0) + 1, d = (s.get(e) || 0) + 1;
				counterMap.set(e, u), s.set(e, d), c.push(e), u === 1 && o && uncontrolledNodes.set(e, !0), d === 1 && e.setAttribute(i, "true"), o || e.setAttribute(a, "true");
			} catch (n) {
				console.error("aria-hidden: cannot operate on ", e, n);
			}
		});
	};
	return f(n), l.clear(), lockCount++, function() {
		c.forEach(function(e) {
			var n = counterMap.get(e) - 1, o = s.get(e) - 1;
			counterMap.set(e, n), s.set(e, o), n || (uncontrolledNodes.has(e) || e.removeAttribute(a), uncontrolledNodes.delete(e)), o || e.removeAttribute(i);
		}), lockCount--, lockCount || (counterMap = /* @__PURE__ */ new WeakMap(), counterMap = /* @__PURE__ */ new WeakMap(), uncontrolledNodes = /* @__PURE__ */ new WeakMap(), markerMap = {});
	};
}, hideOthers = function(e, n, i) {
	i === void 0 && (i = "data-aria-hidden");
	var a = Array.from(Array.isArray(e) ? e : [e]), o = n || getDefaultParent(e);
	return o ? (a.push.apply(a, Array.from(o.querySelectorAll("[aria-live], script"))), applyAttributeToOthers(a, o, i, "aria-hidden")) : function() {
		return null;
	};
}, DIALOG_NAME = "Dialog", [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME), [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME), Dialog = (n) => {
	let { __scopeDialog: i, children: a, open: o, defaultOpen: s, onOpenChange: c, modal: l = !0 } = n, u = React$1.useRef(null), d = React$1.useRef(null), [p, m] = useControllableState({
		prop: o,
		defaultProp: s ?? !1,
		onChange: c,
		caller: DIALOG_NAME
	});
	return /* @__PURE__ */ jsx(DialogProvider, {
		scope: i,
		triggerRef: u,
		contentRef: d,
		contentId: useId$1(),
		titleId: useId$1(),
		descriptionId: useId$1(),
		open: p,
		onOpenChange: m,
		onOpenToggle: React$1.useCallback(() => m((e) => !e), [m]),
		modal: l,
		children: a
	});
};
Dialog.displayName = DIALOG_NAME;
var TRIGGER_NAME$1 = "DialogTrigger", DialogTrigger = React$1.forwardRef((e, n) => {
	let { __scopeDialog: i, ...a } = e, o = useDialogContext(TRIGGER_NAME$1, i), s = useComposedRefs(n, o.triggerRef);
	return /* @__PURE__ */ jsx(Primitive.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": o.open,
		"aria-controls": o.contentId,
		"data-state": getState(o.open),
		...a,
		ref: s,
		onClick: composeEventHandlers(e.onClick, o.onOpenToggle)
	});
});
DialogTrigger.displayName = TRIGGER_NAME$1;
var PORTAL_NAME$1 = "DialogPortal", [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME$1, { forceMount: void 0 }), DialogPortal = (n) => {
	let { __scopeDialog: i, forceMount: a, children: o, container: s } = n, c = useDialogContext(PORTAL_NAME$1, i);
	return /* @__PURE__ */ jsx(PortalProvider, {
		scope: i,
		forceMount: a,
		children: React$1.Children.map(o, (e) => /* @__PURE__ */ jsx(Presence, {
			present: a || c.open,
			children: /* @__PURE__ */ jsx(Portal, {
				asChild: !0,
				container: s,
				children: e
			})
		}))
	});
};
DialogPortal.displayName = PORTAL_NAME$1;
var OVERLAY_NAME = "DialogOverlay", DialogOverlay = React$1.forwardRef((e, n) => {
	let i = usePortalContext(OVERLAY_NAME, e.__scopeDialog), { forceMount: a = i.forceMount, ...o } = e, s = useDialogContext(OVERLAY_NAME, e.__scopeDialog);
	return s.modal ? /* @__PURE__ */ jsx(Presence, {
		present: a || s.open,
		children: /* @__PURE__ */ jsx(DialogOverlayImpl, {
			...o,
			ref: n
		})
	}) : null;
});
DialogOverlay.displayName = OVERLAY_NAME;
var Slot$1 = /* @__PURE__ */ createSlot("DialogOverlay.RemoveScroll"), DialogOverlayImpl = React$1.forwardRef((e, n) => {
	let { __scopeDialog: i, ...a } = e, o = useDialogContext(OVERLAY_NAME, i);
	return /* @__PURE__ */ jsx(Combination_default, {
		as: Slot$1,
		allowPinchZoom: !0,
		shards: [o.contentRef],
		children: /* @__PURE__ */ jsx(Primitive.div, {
			"data-state": getState(o.open),
			...a,
			ref: n,
			style: {
				pointerEvents: "auto",
				...a.style
			}
		})
	});
}), CONTENT_NAME$2 = "DialogContent", DialogContent = React$1.forwardRef((e, n) => {
	let i = usePortalContext(CONTENT_NAME$2, e.__scopeDialog), { forceMount: a = i.forceMount, ...o } = e, s = useDialogContext(CONTENT_NAME$2, e.__scopeDialog);
	return /* @__PURE__ */ jsx(Presence, {
		present: a || s.open,
		children: s.modal ? /* @__PURE__ */ jsx(DialogContentModal, {
			...o,
			ref: n
		}) : /* @__PURE__ */ jsx(DialogContentNonModal, {
			...o,
			ref: n
		})
	});
});
DialogContent.displayName = CONTENT_NAME$2;
var DialogContentModal = React$1.forwardRef((n, i) => {
	let a = useDialogContext(CONTENT_NAME$2, n.__scopeDialog), o = React$1.useRef(null), s = useComposedRefs(i, a.contentRef, o);
	return React$1.useEffect(() => {
		let e = o.current;
		if (e) return hideOthers(e);
	}, []), /* @__PURE__ */ jsx(DialogContentImpl, {
		...n,
		ref: s,
		trapFocus: a.open,
		disableOutsidePointerEvents: !0,
		onCloseAutoFocus: composeEventHandlers(n.onCloseAutoFocus, (e) => {
			e.preventDefault(), a.triggerRef.current?.focus();
		}),
		onPointerDownOutside: composeEventHandlers(n.onPointerDownOutside, (e) => {
			let n = e.detail.originalEvent, i = n.button === 0 && n.ctrlKey === !0;
			(n.button === 2 || i) && e.preventDefault();
		}),
		onFocusOutside: composeEventHandlers(n.onFocusOutside, (e) => e.preventDefault())
	});
}), DialogContentNonModal = React$1.forwardRef((n, i) => {
	let a = useDialogContext(CONTENT_NAME$2, n.__scopeDialog), o = React$1.useRef(!1), s = React$1.useRef(!1);
	return /* @__PURE__ */ jsx(DialogContentImpl, {
		...n,
		ref: i,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (e) => {
			n.onCloseAutoFocus?.(e), e.defaultPrevented || (o.current || a.triggerRef.current?.focus(), e.preventDefault()), o.current = !1, s.current = !1;
		},
		onInteractOutside: (e) => {
			n.onInteractOutside?.(e), e.defaultPrevented || (o.current = !0, e.detail.originalEvent.type === "pointerdown" && (s.current = !0));
			let i = e.target;
			a.triggerRef.current?.contains(i) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && s.current && e.preventDefault();
		}
	});
}), DialogContentImpl = React$1.forwardRef((n, i) => {
	let { __scopeDialog: a, trapFocus: o, onOpenAutoFocus: s, onCloseAutoFocus: c, ...l } = n, u = useDialogContext(CONTENT_NAME$2, a), m = React$1.useRef(null), h = useComposedRefs(i, m);
	return useFocusGuards(), /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FocusScope, {
		asChild: !0,
		loop: !0,
		trapped: o,
		onMountAutoFocus: s,
		onUnmountAutoFocus: c,
		children: /* @__PURE__ */ jsx(DismissableLayer, {
			role: "dialog",
			id: u.contentId,
			"aria-describedby": u.descriptionId,
			"aria-labelledby": u.titleId,
			"data-state": getState(u.open),
			...l,
			ref: h,
			onDismiss: () => u.onOpenChange(!1)
		})
	}), /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(TitleWarning, { titleId: u.titleId }), /* @__PURE__ */ jsx(DescriptionWarning, {
		contentRef: m,
		descriptionId: u.descriptionId
	})] })] });
}), TITLE_NAME = "DialogTitle", DialogTitle = React$1.forwardRef((e, n) => {
	let { __scopeDialog: i, ...a } = e, o = useDialogContext(TITLE_NAME, i);
	return /* @__PURE__ */ jsx(Primitive.h2, {
		id: o.titleId,
		...a,
		ref: n
	});
});
DialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription", DialogDescription = React$1.forwardRef((e, n) => {
	let { __scopeDialog: i, ...a } = e, o = useDialogContext(DESCRIPTION_NAME, i);
	return /* @__PURE__ */ jsx(Primitive.p, {
		id: o.descriptionId,
		...a,
		ref: n
	});
});
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose", DialogClose = React$1.forwardRef((e, n) => {
	let { __scopeDialog: i, ...a } = e, o = useDialogContext(CLOSE_NAME, i);
	return /* @__PURE__ */ jsx(Primitive.button, {
		type: "button",
		...a,
		ref: n,
		onClick: composeEventHandlers(e.onClick, () => o.onOpenChange(!1))
	});
});
DialogClose.displayName = CLOSE_NAME;
function getState(e) {
	return e ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning", [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
	contentName: CONTENT_NAME$2,
	titleName: TITLE_NAME,
	docsSlug: "dialog"
}), TitleWarning = ({ titleId: n }) => {
	let i = useWarningContext(TITLE_WARNING_NAME), a = `\`${i.contentName}\` requires a \`${i.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${i.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${i.docsSlug}`;
	return React$1.useEffect(() => {
		n && (document.getElementById(n) || console.error(a));
	}, [a, n]), null;
}, DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning", DescriptionWarning = ({ contentRef: n, descriptionId: i }) => {
	let a = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${useWarningContext(DESCRIPTION_WARNING_NAME).contentName}}.`;
	return React$1.useEffect(() => {
		let e = n.current?.getAttribute("aria-describedby");
		i && e && (document.getElementById(i) || console.warn(a));
	}, [
		a,
		n,
		i
	]), null;
}, Root$1 = Dialog, Trigger$1 = DialogTrigger, Portal$2 = DialogPortal, Overlay = DialogOverlay, Content$1 = DialogContent, Title = DialogTitle, Description = DialogDescription, Close = DialogClose;
const modalSectionX = "pl-6 pr-4", modalTitleSize = {
	sm: "text-sm font-medium leading-snug",
	default: "text-base font-medium leading-snug",
	lg: "text-lg font-medium leading-snug"
}, modalDescriptionSize = {
	sm: "text-xs leading-normal",
	default: "text-sm leading-normal"
}, modalContentSize = {
	sm: "max-w-sm",
	default: "max-w-lg",
	lg: "max-w-2xl"
}, modalFooterAlign = {
	end: "justify-end",
	center: "justify-center",
	start: "justify-start"
}, modalTextAlign = {
	start: "text-start",
	center: "text-center"
}, modalOverlay = ["fixed inset-0 z-50 bg-[color-mix(in_oklab,var(--color-text-primary)_5%,transparent)]", "transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100"].join(" "), modalContentPanel = [
	"fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-border bg-surface-elevated text-text-primary outline-none",
	"transition-[opacity,transform] duration-200 data-[state=closed]:scale-[0.98] data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
	"max-h-[min(85vh,40rem)]"
].join(" ");
var Modal = Root$1, ModalTrigger = Trigger$1, ModalTextAlignContext = React$1.createContext("start");
function useModalTextAlign() {
	return React$1.useContext(ModalTextAlignContext);
}
function ModalContent({ size: e = "default", textAlign: n = "start", children: i }) {
	return /* @__PURE__ */ jsx(ModalTextAlignContext.Provider, {
		value: n,
		children: /* @__PURE__ */ jsxs(Portal$2, { children: [/* @__PURE__ */ jsx(Overlay, { className: modalOverlay }), /* @__PURE__ */ jsx(Content$1, {
			className: `${modalContentPanel} ${modalContentSize[e]}`,
			children: i
		})] })
	});
}
function ModalHeader({ title: e, description: n, titleSize: i = "default", descriptionSize: a = "default", showClose: o = !1 }) {
	let s = useModalTextAlign(), c = /* @__PURE__ */ jsxs("div", {
		className: `flex min-w-0 flex-col gap-1 ${s === "start" && o ? "pr-3" : ""}`,
		children: [/* @__PURE__ */ jsx(Title, {
			className: `${modalTitleSize[i]} text-text-primary`,
			children: e
		}), n ? /* @__PURE__ */ jsx(Description, {
			className: `${modalDescriptionSize[a]} text-text-muted`,
			children: n
		}) : null]
	}), l = `pt-5 pb-2 ${modalSectionX} ${modalTextAlign[s]}`;
	return o ? /* @__PURE__ */ jsxs("div", {
		className: `relative ${l}`,
		children: [c, /* @__PURE__ */ jsx(Close, {
			asChild: !0,
			className: "absolute right-2.5 top-2.5",
			children: /* @__PURE__ */ jsx(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				"aria-label": "Close",
				children: /* @__PURE__ */ jsx(X, {
					className: "size-4",
					"aria-hidden": !0
				})
			})
		})]
	}) : /* @__PURE__ */ jsx("div", {
		className: l,
		children: c
	});
}
function ModalBody({ children: e }) {
	return /* @__PURE__ */ jsx("div", {
		className: `flex-1 overflow-y-auto py-3 ${modalSectionX} ${modalTextAlign[useModalTextAlign()]}`,
		children: e
	});
}
function ModalFooter({ align: e = "end", children: n }) {
	return /* @__PURE__ */ jsx("div", {
		className: `flex flex-wrap items-center gap-3 py-4 ${modalFooterAlign[e]} ${modalSectionX}`,
		children: n
	});
}
function clamp(e, [n, i]) {
	return Math.min(i, Math.max(n, e));
}
function createCollection(e) {
	let i = e + "CollectionProvider", [a, o] = createContextScope(i), [s, c] = a(i, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), l = (e) => {
		let { scope: i, children: a } = e, o = React.useRef(null), c = React.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ jsx(s, {
			scope: i,
			itemMap: c,
			collectionRef: o,
			children: a
		});
	};
	l.displayName = i;
	let u = e + "CollectionSlot", d = /* @__PURE__ */ createSlot(u), p = React.forwardRef((e, n) => {
		let { scope: i, children: a } = e;
		return /* @__PURE__ */ jsx(d, {
			ref: useComposedRefs(n, c(u, i).collectionRef),
			children: a
		});
	});
	p.displayName = u;
	let m = e + "CollectionItemSlot", h = "data-radix-collection-item", g = /* @__PURE__ */ createSlot(m), _ = React.forwardRef((e, i) => {
		let { scope: a, children: o, ...s } = e, l = React.useRef(null), u = useComposedRefs(i, l), d = c(m, a);
		return React.useEffect(() => (d.itemMap.set(l, {
			ref: l,
			...s
		}), () => void d.itemMap.delete(l))), /* @__PURE__ */ jsx(g, {
			[h]: "",
			ref: u,
			children: o
		});
	});
	_.displayName = m;
	function y(i) {
		let a = c(e + "CollectionConsumer", i);
		return React.useCallback(() => {
			let e = a.collectionRef.current;
			if (!e) return [];
			let n = Array.from(e.querySelectorAll(`[${h}]`));
			return Array.from(a.itemMap.values()).sort((e, i) => n.indexOf(e.ref.current) - n.indexOf(i.ref.current));
		}, [a.collectionRef, a.itemMap]);
	}
	return [
		{
			Provider: l,
			Slot: p,
			ItemSlot: _
		},
		y,
		o
	];
}
var DirectionContext = React$1.createContext(void 0);
function useDirection(n) {
	let i = React$1.useContext(DirectionContext);
	return n || i || "ltr";
}
var sides = [
	"top",
	"right",
	"bottom",
	"left"
], min = Math.min, max = Math.max, round = Math.round, floor = Math.floor, createCoords = (e) => ({
	x: e,
	y: e
}), oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp$1(e, n, i) {
	return max(e, min(n, i));
}
function evaluate(e, n) {
	return typeof e == "function" ? e(n) : e;
}
function getSide(e) {
	return e.split("-")[0];
}
function getAlignment(e) {
	return e.split("-")[1];
}
function getOppositeAxis(e) {
	return e === "x" ? "y" : "x";
}
function getAxisLength(e) {
	return e === "y" ? "height" : "width";
}
function getSideAxis(e) {
	let n = e[0];
	return n === "t" || n === "b" ? "y" : "x";
}
function getAlignmentAxis(e) {
	return getOppositeAxis(getSideAxis(e));
}
function getAlignmentSides(e, n, i) {
	i === void 0 && (i = !1);
	let a = getAlignment(e), o = getAlignmentAxis(e), s = getAxisLength(o), c = o === "x" ? a === (i ? "end" : "start") ? "right" : "left" : a === "start" ? "bottom" : "top";
	return n.reference[s] > n.floating[s] && (c = getOppositePlacement(c)), [c, getOppositePlacement(c)];
}
function getExpandedPlacements(e) {
	let n = getOppositePlacement(e);
	return [
		getOppositeAlignmentPlacement(e),
		n,
		getOppositeAlignmentPlacement(n)
	];
}
function getOppositeAlignmentPlacement(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var lrPlacement = ["left", "right"], rlPlacement = ["right", "left"], tbPlacement = ["top", "bottom"], btPlacement = ["bottom", "top"];
function getSideList(e, n, i) {
	switch (e) {
		case "top":
		case "bottom": return i ? n ? rlPlacement : lrPlacement : n ? lrPlacement : rlPlacement;
		case "left":
		case "right": return n ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(e, n, i, a) {
	let o = getAlignment(e), s = getSideList(getSide(e), i === "start", a);
	return o && (s = s.map((e) => e + "-" + o), n && (s = s.concat(s.map(getOppositeAlignmentPlacement)))), s;
}
function getOppositePlacement(e) {
	let n = getSide(e);
	return oppositeSideMap[n] + e.slice(n.length);
}
function expandPaddingObject(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function getPaddingObject(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : expandPaddingObject(e);
}
function rectToClientRect(e) {
	let { x: n, y: i, width: a, height: o } = e;
	return {
		width: a,
		height: o,
		top: i,
		left: n,
		right: n + a,
		bottom: i + o,
		x: n,
		y: i
	};
}
function computeCoordsFromPlacement(e, n, i) {
	let { reference: a, floating: o } = e, s = getSideAxis(n), c = getAlignmentAxis(n), l = getAxisLength(c), u = getSide(n), d = s === "y", f = a.x + a.width / 2 - o.width / 2, p = a.y + a.height / 2 - o.height / 2, m = a[l] / 2 - o[l] / 2, h;
	switch (u) {
		case "top":
			h = {
				x: f,
				y: a.y - o.height
			};
			break;
		case "bottom":
			h = {
				x: f,
				y: a.y + a.height
			};
			break;
		case "right":
			h = {
				x: a.x + a.width,
				y: p
			};
			break;
		case "left":
			h = {
				x: a.x - o.width,
				y: p
			};
			break;
		default: h = {
			x: a.x,
			y: a.y
		};
	}
	switch (getAlignment(n)) {
		case "start":
			h[c] -= m * (i && d ? -1 : 1);
			break;
		case "end":
			h[c] += m * (i && d ? -1 : 1);
			break;
	}
	return h;
}
async function detectOverflow$1(e, n) {
	n === void 0 && (n = {});
	let { x: i, y: a, platform: o, rects: s, elements: c, strategy: l } = e, { boundary: u = "clippingAncestors", rootBoundary: d = "viewport", elementContext: f = "floating", altBoundary: p = !1, padding: m = 0 } = evaluate(n, e), h = getPaddingObject(m), g = c[p ? f === "floating" ? "reference" : "floating" : f], _ = rectToClientRect(await o.getClippingRect({
		element: await (o.isElement == null ? void 0 : o.isElement(g)) ?? !0 ? g : g.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(c.floating)),
		boundary: u,
		rootBoundary: d,
		strategy: l
	})), v = f === "floating" ? {
		x: i,
		y: a,
		width: s.floating.width,
		height: s.floating.height
	} : s.reference, y = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(c.floating)), b = await (o.isElement == null ? void 0 : o.isElement(y)) && await (o.getScale == null ? void 0 : o.getScale(y)) || {
		x: 1,
		y: 1
	}, x = rectToClientRect(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: c,
		rect: v,
		offsetParent: y,
		strategy: l
	}) : v);
	return {
		top: (_.top - x.top + h.top) / b.y,
		bottom: (x.bottom - _.bottom + h.bottom) / b.y,
		left: (_.left - x.left + h.left) / b.x,
		right: (x.right - _.right + h.right) / b.x
	};
}
var MAX_RESET_COUNT = 50, computePosition$1 = async (e, n, i) => {
	let { placement: a = "bottom", strategy: o = "absolute", middleware: s = [], platform: c } = i, l = c.detectOverflow ? c : {
		...c,
		detectOverflow: detectOverflow$1
	}, u = await (c.isRTL == null ? void 0 : c.isRTL(n)), d = await c.getElementRects({
		reference: e,
		floating: n,
		strategy: o
	}), { x: f, y: p } = computeCoordsFromPlacement(d, a, u), m = a, h = 0, g = {};
	for (let i = 0; i < s.length; i++) {
		let _ = s[i];
		if (!_) continue;
		let { name: v, fn: y } = _, { x: b, y: x, data: S, reset: C } = await y({
			x: f,
			y: p,
			initialPlacement: a,
			placement: m,
			strategy: o,
			middlewareData: g,
			rects: d,
			platform: l,
			elements: {
				reference: e,
				floating: n
			}
		});
		f = b ?? f, p = x ?? p, g[v] = {
			...g[v],
			...S
		}, C && h < MAX_RESET_COUNT && (h++, typeof C == "object" && (C.placement && (m = C.placement), C.rects && (d = C.rects === !0 ? await c.getElementRects({
			reference: e,
			floating: n,
			strategy: o
		}) : C.rects), {x: f, y: p} = computeCoordsFromPlacement(d, m, u)), i = -1);
	}
	return {
		x: f,
		y: p,
		placement: m,
		strategy: o,
		middlewareData: g
	};
}, arrow$2 = (e) => ({
	name: "arrow",
	options: e,
	async fn(n) {
		let { x: i, y: a, placement: o, rects: s, platform: c, elements: l, middlewareData: u } = n, { element: d, padding: f = 0 } = evaluate(e, n) || {};
		if (d == null) return {};
		let p = getPaddingObject(f), m = {
			x: i,
			y: a
		}, h = getAlignmentAxis(o), g = getAxisLength(h), _ = await c.getDimensions(d), v = h === "y", y = v ? "top" : "left", b = v ? "bottom" : "right", x = v ? "clientHeight" : "clientWidth", S = s.reference[g] + s.reference[h] - m[h] - s.floating[g], C = m[h] - s.reference[h], w = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(d)), T = w ? w[x] : 0;
		(!T || !await (c.isElement == null ? void 0 : c.isElement(w))) && (T = l.floating[x] || s.floating[g]);
		let E = S / 2 - C / 2, D = T / 2 - _[g] / 2 - 1, O = min(p[y], D), k = min(p[b], D), A = O, j = T - _[g] - k, M = T / 2 - _[g] / 2 + E, N = clamp$1(A, M, j), P = !u.arrow && getAlignment(o) != null && M !== N && s.reference[g] / 2 - (M < A ? O : k) - _[g] / 2 < 0, F = P ? M < A ? M - A : M - j : 0;
		return {
			[h]: m[h] + F,
			data: {
				[h]: N,
				centerOffset: M - N - F,
				...P && { alignmentOffset: F }
			},
			reset: P
		};
	}
}), flip$2 = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(n) {
			var i;
			let { placement: a, middlewareData: o, rects: s, initialPlacement: c, platform: l, elements: u } = n, { mainAxis: d = !0, crossAxis: f = !0, fallbackPlacements: p, fallbackStrategy: m = "bestFit", fallbackAxisSideDirection: h = "none", flipAlignment: g = !0, ..._ } = evaluate(e, n);
			if ((i = o.arrow) != null && i.alignmentOffset) return {};
			let v = getSide(a), y = getSideAxis(c), b = getSide(c) === c, x = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), S = p || (b || !g ? [getOppositePlacement(c)] : getExpandedPlacements(c)), C = h !== "none";
			!p && C && S.push(...getOppositeAxisPlacements(c, g, h, x));
			let w = [c, ...S], T = await l.detectOverflow(n, _), E = [], D = o.flip?.overflows || [];
			if (d && E.push(T[v]), f) {
				let e = getAlignmentSides(a, s, x);
				E.push(T[e[0]], T[e[1]]);
			}
			if (D = [...D, {
				placement: a,
				overflows: E
			}], !E.every((e) => e <= 0)) {
				let e = (o.flip?.index || 0) + 1, n = w[e];
				if (n && (!(f === "alignment" && y !== getSideAxis(n)) || D.every((e) => getSideAxis(e.placement) === y ? e.overflows[0] > 0 : !0))) return {
					data: {
						index: e,
						overflows: D
					},
					reset: { placement: n }
				};
				let i = D.filter((e) => e.overflows[0] <= 0).sort((e, n) => e.overflows[1] - n.overflows[1])[0]?.placement;
				if (!i) switch (m) {
					case "bestFit": {
						let e = D.filter((e) => {
							if (C) {
								let n = getSideAxis(e.placement);
								return n === y || n === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, n) => e + n, 0)]).sort((e, n) => e[1] - n[1])[0]?.[0];
						e && (i = e);
						break;
					}
					case "initialPlacement":
						i = c;
						break;
				}
				if (a !== i) return { reset: { placement: i } };
			}
			return {};
		}
	};
};
function getSideOffsets(e, n) {
	return {
		top: e.top - n.height,
		right: e.right - n.width,
		bottom: e.bottom - n.height,
		left: e.left - n.width
	};
}
function isAnySideFullyClipped(e) {
	return sides.some((n) => e[n] >= 0);
}
var hide$2 = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(n) {
			let { rects: i, platform: a } = n, { strategy: o = "referenceHidden", ...s } = evaluate(e, n);
			switch (o) {
				case "referenceHidden": {
					let e = getSideOffsets(await a.detectOverflow(n, {
						...s,
						elementContext: "reference"
					}), i.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: isAnySideFullyClipped(e)
					} };
				}
				case "escaped": {
					let e = getSideOffsets(await a.detectOverflow(n, {
						...s,
						altBoundary: !0
					}), i.floating);
					return { data: {
						escapedOffsets: e,
						escaped: isAnySideFullyClipped(e)
					} };
				}
				default: return {};
			}
		}
	};
}, originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(e, n) {
	let { placement: i, platform: a, elements: o } = e, s = await (a.isRTL == null ? void 0 : a.isRTL(o.floating)), c = getSide(i), l = getAlignment(i), u = getSideAxis(i) === "y", d = originSides.has(c) ? -1 : 1, f = s && u ? -1 : 1, p = evaluate(n, e), { mainAxis: m, crossAxis: h, alignmentAxis: g } = typeof p == "number" ? {
		mainAxis: p,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: p.mainAxis || 0,
		crossAxis: p.crossAxis || 0,
		alignmentAxis: p.alignmentAxis
	};
	return l && typeof g == "number" && (h = l === "end" ? g * -1 : g), u ? {
		x: h * f,
		y: m * d
	} : {
		x: m * d,
		y: h * f
	};
}
var offset$2 = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(n) {
			var i;
			let { x: a, y: o, placement: s, middlewareData: c } = n, l = await convertValueToCoords(n, e);
			return s === c.offset?.placement && (i = c.arrow) != null && i.alignmentOffset ? {} : {
				x: a + l.x,
				y: o + l.y,
				data: {
					...l,
					placement: s
				}
			};
		}
	};
}, shift$2 = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(n) {
			let { x: i, y: a, placement: o, platform: s } = n, { mainAxis: c = !0, crossAxis: l = !1, limiter: u = { fn: (e) => {
				let { x: n, y: i } = e;
				return {
					x: n,
					y: i
				};
			} }, ...d } = evaluate(e, n), f = {
				x: i,
				y: a
			}, p = await s.detectOverflow(n, d), m = getSideAxis(getSide(o)), h = getOppositeAxis(m), g = f[h], _ = f[m];
			if (c) {
				let e = h === "y" ? "top" : "left", n = h === "y" ? "bottom" : "right", i = g + p[e], a = g - p[n];
				g = clamp$1(i, g, a);
			}
			if (l) {
				let e = m === "y" ? "top" : "left", n = m === "y" ? "bottom" : "right", i = _ + p[e], a = _ - p[n];
				_ = clamp$1(i, _, a);
			}
			let v = u.fn({
				...n,
				[h]: g,
				[m]: _
			});
			return {
				...v,
				data: {
					x: v.x - i,
					y: v.y - a,
					enabled: {
						[h]: c,
						[m]: l
					}
				}
			};
		}
	};
}, limitShift$2 = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(n) {
			let { x: i, y: a, placement: o, rects: s, middlewareData: c } = n, { offset: l = 0, mainAxis: u = !0, crossAxis: d = !0 } = evaluate(e, n), f = {
				x: i,
				y: a
			}, p = getSideAxis(o), m = getOppositeAxis(p), h = f[m], g = f[p], _ = evaluate(l, n), v = typeof _ == "number" ? {
				mainAxis: _,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				..._
			};
			if (u) {
				let e = m === "y" ? "height" : "width", n = s.reference[m] - s.floating[e] + v.mainAxis, i = s.reference[m] + s.reference[e] - v.mainAxis;
				h < n ? h = n : h > i && (h = i);
			}
			if (d) {
				let e = m === "y" ? "width" : "height", n = originSides.has(getSide(o)), i = s.reference[p] - s.floating[e] + (n && c.offset?.[p] || 0) + (n ? 0 : v.crossAxis), a = s.reference[p] + s.reference[e] + (n ? 0 : c.offset?.[p] || 0) - (n ? v.crossAxis : 0);
				g < i ? g = i : g > a && (g = a);
			}
			return {
				[m]: h,
				[p]: g
			};
		}
	};
}, size$2 = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(n) {
			var i, a;
			let { placement: o, rects: s, platform: c, elements: l } = n, { apply: u = () => {}, ...d } = evaluate(e, n), f = await c.detectOverflow(n, d), p = getSide(o), m = getAlignment(o), h = getSideAxis(o) === "y", { width: g, height: _ } = s.floating, v, y;
			p === "top" || p === "bottom" ? (v = p, y = m === (await (c.isRTL == null ? void 0 : c.isRTL(l.floating)) ? "start" : "end") ? "left" : "right") : (y = p, v = m === "end" ? "top" : "bottom");
			let b = _ - f.top - f.bottom, x = g - f.left - f.right, S = min(_ - f[v], b), C = min(g - f[y], x), w = !n.middlewareData.shift, T = S, E = C;
			if ((i = n.middlewareData.shift) != null && i.enabled.x && (E = x), (a = n.middlewareData.shift) != null && a.enabled.y && (T = b), w && !m) {
				let e = max(f.left, 0), n = max(f.right, 0), i = max(f.top, 0), a = max(f.bottom, 0);
				h ? E = g - 2 * (e !== 0 || n !== 0 ? e + n : max(f.left, f.right)) : T = _ - 2 * (i !== 0 || a !== 0 ? i + a : max(f.top, f.bottom));
			}
			await u({
				...n,
				availableWidth: E,
				availableHeight: T
			});
			let D = await c.getDimensions(l.floating);
			return g !== D.width || _ !== D.height ? { reset: { rects: !0 } } : {};
		}
	};
};
function hasWindow() {
	return typeof window < "u";
}
function getNodeName(e) {
	return isNode(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function getWindow(e) {
	var n;
	return (e == null || (n = e.ownerDocument) == null ? void 0 : n.defaultView) || window;
}
function getDocumentElement(e) {
	return ((isNode(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function isNode(e) {
	return hasWindow() ? e instanceof Node || e instanceof getWindow(e).Node : !1;
}
function isElement(e) {
	return hasWindow() ? e instanceof Element || e instanceof getWindow(e).Element : !1;
}
function isHTMLElement(e) {
	return hasWindow() ? e instanceof HTMLElement || e instanceof getWindow(e).HTMLElement : !1;
}
function isShadowRoot(e) {
	return !hasWindow() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof getWindow(e).ShadowRoot;
}
function isOverflowElement(e) {
	let { overflow: n, overflowX: i, overflowY: a, display: o } = getComputedStyle$1(e);
	return /auto|scroll|overlay|hidden|clip/.test(n + a + i) && o !== "inline" && o !== "contents";
}
function isTableElement(e) {
	return /^(table|td|th)$/.test(getNodeName(e));
}
function isTopLayer(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/, containRe = /paint|layout|strict|content/, isNotNone = (e) => !!e && e !== "none", isWebKitValue;
function isContainingBlock(e) {
	let n = isElement(e) ? getComputedStyle$1(e) : e;
	return isNotNone(n.transform) || isNotNone(n.translate) || isNotNone(n.scale) || isNotNone(n.rotate) || isNotNone(n.perspective) || !isWebKit() && (isNotNone(n.backdropFilter) || isNotNone(n.filter)) || willChangeRe.test(n.willChange || "") || containRe.test(n.contain || "");
}
function getContainingBlock(e) {
	let n = getParentNode(e);
	for (; isHTMLElement(n) && !isLastTraversableNode(n);) {
		if (isContainingBlock(n)) return n;
		if (isTopLayer(n)) return null;
		n = getParentNode(n);
	}
	return null;
}
function isWebKit() {
	return isWebKitValue ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), isWebKitValue;
}
function isLastTraversableNode(e) {
	return /^(html|body|#document)$/.test(getNodeName(e));
}
function getComputedStyle$1(e) {
	return getWindow(e).getComputedStyle(e);
}
function getNodeScroll(e) {
	return isElement(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function getParentNode(e) {
	if (getNodeName(e) === "html") return e;
	let n = e.assignedSlot || e.parentNode || isShadowRoot(e) && e.host || getDocumentElement(e);
	return isShadowRoot(n) ? n.host : n;
}
function getNearestOverflowAncestor(e) {
	let n = getParentNode(e);
	return isLastTraversableNode(n) ? e.ownerDocument ? e.ownerDocument.body : e.body : isHTMLElement(n) && isOverflowElement(n) ? n : getNearestOverflowAncestor(n);
}
function getOverflowAncestors(e, n, i) {
	n === void 0 && (n = []), i === void 0 && (i = !0);
	let a = getNearestOverflowAncestor(e), o = a === e.ownerDocument?.body, s = getWindow(a);
	if (o) {
		let e = getFrameElement(s);
		return n.concat(s, s.visualViewport || [], isOverflowElement(a) ? a : [], e && i ? getOverflowAncestors(e) : []);
	} else return n.concat(a, getOverflowAncestors(a, [], i));
}
function getFrameElement(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function getCssDimensions(e) {
	let n = getComputedStyle$1(e), i = parseFloat(n.width) || 0, a = parseFloat(n.height) || 0, o = isHTMLElement(e), s = o ? e.offsetWidth : i, c = o ? e.offsetHeight : a, l = round(i) !== s || round(a) !== c;
	return l && (i = s, a = c), {
		width: i,
		height: a,
		$: l
	};
}
function unwrapElement(e) {
	return isElement(e) ? e : e.contextElement;
}
function getScale(e) {
	let n = unwrapElement(e);
	if (!isHTMLElement(n)) return createCoords(1);
	let i = n.getBoundingClientRect(), { width: a, height: o, $: s } = getCssDimensions(n), c = (s ? round(i.width) : i.width) / a, l = (s ? round(i.height) : i.height) / o;
	return (!c || !Number.isFinite(c)) && (c = 1), (!l || !Number.isFinite(l)) && (l = 1), {
		x: c,
		y: l
	};
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(e) {
	let n = getWindow(e);
	return !isWebKit() || !n.visualViewport ? noOffsets : {
		x: n.visualViewport.offsetLeft,
		y: n.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(e, n, i) {
	return n === void 0 && (n = !1), !i || n && i !== getWindow(e) ? !1 : n;
}
function getBoundingClientRect(e, n, i, a) {
	n === void 0 && (n = !1), i === void 0 && (i = !1);
	let o = e.getBoundingClientRect(), s = unwrapElement(e), c = createCoords(1);
	n && (a ? isElement(a) && (c = getScale(a)) : c = getScale(e));
	let l = shouldAddVisualOffsets(s, i, a) ? getVisualOffsets(s) : createCoords(0), u = (o.left + l.x) / c.x, d = (o.top + l.y) / c.y, f = o.width / c.x, p = o.height / c.y;
	if (s) {
		let e = getWindow(s), n = a && isElement(a) ? getWindow(a) : a, i = e, o = getFrameElement(i);
		for (; o && a && n !== i;) {
			let e = getScale(o), n = o.getBoundingClientRect(), a = getComputedStyle$1(o), s = n.left + (o.clientLeft + parseFloat(a.paddingLeft)) * e.x, c = n.top + (o.clientTop + parseFloat(a.paddingTop)) * e.y;
			u *= e.x, d *= e.y, f *= e.x, p *= e.y, u += s, d += c, i = getWindow(o), o = getFrameElement(i);
		}
	}
	return rectToClientRect({
		width: f,
		height: p,
		x: u,
		y: d
	});
}
function getWindowScrollBarX(e, n) {
	let i = getNodeScroll(e).scrollLeft;
	return n ? n.left + i : getBoundingClientRect(getDocumentElement(e)).left + i;
}
function getHTMLOffset(e, n) {
	let i = e.getBoundingClientRect();
	return {
		x: i.left + n.scrollLeft - getWindowScrollBarX(e, i),
		y: i.top + n.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(e) {
	let { elements: n, rect: i, offsetParent: a, strategy: o } = e, s = o === "fixed", c = getDocumentElement(a), l = n ? isTopLayer(n.floating) : !1;
	if (a === c || l && s) return i;
	let u = {
		scrollLeft: 0,
		scrollTop: 0
	}, d = createCoords(1), f = createCoords(0), p = isHTMLElement(a);
	if ((p || !p && !s) && ((getNodeName(a) !== "body" || isOverflowElement(c)) && (u = getNodeScroll(a)), p)) {
		let e = getBoundingClientRect(a);
		d = getScale(a), f.x = e.x + a.clientLeft, f.y = e.y + a.clientTop;
	}
	let m = c && !p && !s ? getHTMLOffset(c, u) : createCoords(0);
	return {
		width: i.width * d.x,
		height: i.height * d.y,
		x: i.x * d.x - u.scrollLeft * d.x + f.x + m.x,
		y: i.y * d.y - u.scrollTop * d.y + f.y + m.y
	};
}
function getClientRects(e) {
	return Array.from(e.getClientRects());
}
function getDocumentRect(e) {
	let n = getDocumentElement(e), i = getNodeScroll(e), a = e.ownerDocument.body, o = max(n.scrollWidth, n.clientWidth, a.scrollWidth, a.clientWidth), s = max(n.scrollHeight, n.clientHeight, a.scrollHeight, a.clientHeight), c = -i.scrollLeft + getWindowScrollBarX(e), l = -i.scrollTop;
	return getComputedStyle$1(a).direction === "rtl" && (c += max(n.clientWidth, a.clientWidth) - o), {
		width: o,
		height: s,
		x: c,
		y: l
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(e, n) {
	let i = getWindow(e), a = getDocumentElement(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		s = o.width, c = o.height;
		let e = isWebKit();
		(!e || e && n === "fixed") && (l = o.offsetLeft, u = o.offsetTop);
	}
	let d = getWindowScrollBarX(a);
	if (d <= 0) {
		let e = a.ownerDocument, n = e.body, i = getComputedStyle(n), o = e.compatMode === "CSS1Compat" && parseFloat(i.marginLeft) + parseFloat(i.marginRight) || 0, c = Math.abs(a.clientWidth - n.clientWidth - o);
		c <= SCROLLBAR_MAX && (s -= c);
	} else d <= SCROLLBAR_MAX && (s += d);
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function getInnerBoundingClientRect(e, n) {
	let i = getBoundingClientRect(e, !0, n === "fixed"), a = i.top + e.clientTop, o = i.left + e.clientLeft, s = isHTMLElement(e) ? getScale(e) : createCoords(1);
	return {
		width: e.clientWidth * s.x,
		height: e.clientHeight * s.y,
		x: o * s.x,
		y: a * s.y
	};
}
function getClientRectFromClippingAncestor(e, n, i) {
	let a;
	if (n === "viewport") a = getViewportRect(e, i);
	else if (n === "document") a = getDocumentRect(getDocumentElement(e));
	else if (isElement(n)) a = getInnerBoundingClientRect(n, i);
	else {
		let i = getVisualOffsets(e);
		a = {
			x: n.x - i.x,
			y: n.y - i.y,
			width: n.width,
			height: n.height
		};
	}
	return rectToClientRect(a);
}
function hasFixedPositionAncestor(e, n) {
	let i = getParentNode(e);
	return i === n || !isElement(i) || isLastTraversableNode(i) ? !1 : getComputedStyle$1(i).position === "fixed" || hasFixedPositionAncestor(i, n);
}
function getClippingElementAncestors(e, n) {
	let i = n.get(e);
	if (i) return i;
	let a = getOverflowAncestors(e, [], !1).filter((e) => isElement(e) && getNodeName(e) !== "body"), o = null, s = getComputedStyle$1(e).position === "fixed", c = s ? getParentNode(e) : e;
	for (; isElement(c) && !isLastTraversableNode(c);) {
		let n = getComputedStyle$1(c), i = isContainingBlock(c);
		!i && n.position === "fixed" && (o = null), (s ? !i && !o : !i && n.position === "static" && o && (o.position === "absolute" || o.position === "fixed") || isOverflowElement(c) && !i && hasFixedPositionAncestor(e, c)) ? a = a.filter((e) => e !== c) : o = n, c = getParentNode(c);
	}
	return n.set(e, a), a;
}
function getClippingRect(e) {
	let { element: n, boundary: i, rootBoundary: a, strategy: o } = e, s = [...i === "clippingAncestors" ? isTopLayer(n) ? [] : getClippingElementAncestors(n, this._c) : [].concat(i), a], c = getClientRectFromClippingAncestor(n, s[0], o), l = c.top, u = c.right, d = c.bottom, f = c.left;
	for (let e = 1; e < s.length; e++) {
		let i = getClientRectFromClippingAncestor(n, s[e], o);
		l = max(i.top, l), u = min(i.right, u), d = min(i.bottom, d), f = max(i.left, f);
	}
	return {
		width: u - f,
		height: d - l,
		x: f,
		y: l
	};
}
function getDimensions(e) {
	let { width: n, height: i } = getCssDimensions(e);
	return {
		width: n,
		height: i
	};
}
function getRectRelativeToOffsetParent(e, n, i) {
	let a = isHTMLElement(n), o = getDocumentElement(n), s = i === "fixed", c = getBoundingClientRect(e, !0, s, n), l = {
		scrollLeft: 0,
		scrollTop: 0
	}, u = createCoords(0);
	function d() {
		u.x = getWindowScrollBarX(o);
	}
	if (a || !a && !s) if ((getNodeName(n) !== "body" || isOverflowElement(o)) && (l = getNodeScroll(n)), a) {
		let e = getBoundingClientRect(n, !0, s, n);
		u.x = e.x + n.clientLeft, u.y = e.y + n.clientTop;
	} else o && d();
	s && !a && o && d();
	let f = o && !a && !s ? getHTMLOffset(o, l) : createCoords(0);
	return {
		x: c.left + l.scrollLeft - u.x - f.x,
		y: c.top + l.scrollTop - u.y - f.y,
		width: c.width,
		height: c.height
	};
}
function isStaticPositioned(e) {
	return getComputedStyle$1(e).position === "static";
}
function getTrueOffsetParent(e, n) {
	if (!isHTMLElement(e) || getComputedStyle$1(e).position === "fixed") return null;
	if (n) return n(e);
	let i = e.offsetParent;
	return getDocumentElement(e) === i && (i = i.ownerDocument.body), i;
}
function getOffsetParent(e, n) {
	let i = getWindow(e);
	if (isTopLayer(e)) return i;
	if (!isHTMLElement(e)) {
		let n = getParentNode(e);
		for (; n && !isLastTraversableNode(n);) {
			if (isElement(n) && !isStaticPositioned(n)) return n;
			n = getParentNode(n);
		}
		return i;
	}
	let a = getTrueOffsetParent(e, n);
	for (; a && isTableElement(a) && isStaticPositioned(a);) a = getTrueOffsetParent(a, n);
	return a && isLastTraversableNode(a) && isStaticPositioned(a) && !isContainingBlock(a) ? i : a || getContainingBlock(e) || i;
}
var getElementRects = async function(e) {
	let n = this.getOffsetParent || getOffsetParent, i = this.getDimensions, a = await i(e.floating);
	return {
		reference: getRectRelativeToOffsetParent(e.reference, await n(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: a.width,
			height: a.height
		}
	};
};
function isRTL(e) {
	return getComputedStyle$1(e).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(e, n) {
	return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function observeMove(e, n) {
	let i = null, a, o = getDocumentElement(e);
	function s() {
		var e;
		clearTimeout(a), (e = i) == null || e.disconnect(), i = null;
	}
	function c(l, u) {
		l === void 0 && (l = !1), u === void 0 && (u = 1), s();
		let d = e.getBoundingClientRect(), { left: f, top: p, width: m, height: h } = d;
		if (l || n(), !m || !h) return;
		let g = floor(p), _ = floor(o.clientWidth - (f + m)), v = floor(o.clientHeight - (p + h)), y = floor(f), b = {
			rootMargin: -g + "px " + -_ + "px " + -v + "px " + -y + "px",
			threshold: max(0, min(1, u)) || 1
		}, x = !0;
		function S(n) {
			let i = n[0].intersectionRatio;
			if (i !== u) {
				if (!x) return c();
				i ? c(!1, i) : a = setTimeout(() => {
					c(!1, 1e-7);
				}, 1e3);
			}
			i === 1 && !rectsAreEqual(d, e.getBoundingClientRect()) && c(), x = !1;
		}
		try {
			i = new IntersectionObserver(S, {
				...b,
				root: o.ownerDocument
			});
		} catch {
			i = new IntersectionObserver(S, b);
		}
		i.observe(e);
	}
	return c(!0), s;
}
function autoUpdate(e, n, i, a) {
	a === void 0 && (a = {});
	let { ancestorScroll: o = !0, ancestorResize: s = !0, elementResize: c = typeof ResizeObserver == "function", layoutShift: l = typeof IntersectionObserver == "function", animationFrame: u = !1 } = a, d = unwrapElement(e), f = o || s ? [...d ? getOverflowAncestors(d) : [], ...n ? getOverflowAncestors(n) : []] : [];
	f.forEach((e) => {
		o && e.addEventListener("scroll", i, { passive: !0 }), s && e.addEventListener("resize", i);
	});
	let p = d && l ? observeMove(d, i) : null, m = -1, h = null;
	c && (h = new ResizeObserver((e) => {
		let [a] = e;
		a && a.target === d && h && n && (h.unobserve(n), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
			var e;
			(e = h) == null || e.observe(n);
		})), i();
	}), d && !u && h.observe(d), n && h.observe(n));
	let g, _ = u ? getBoundingClientRect(e) : null;
	u && v();
	function v() {
		let n = getBoundingClientRect(e);
		_ && !rectsAreEqual(_, n) && i(), _ = n, g = requestAnimationFrame(v);
	}
	return i(), () => {
		var e;
		f.forEach((e) => {
			o && e.removeEventListener("scroll", i), s && e.removeEventListener("resize", i);
		}), p?.(), (e = h) == null || e.disconnect(), h = null, u && cancelAnimationFrame(g);
	};
}
var offset$1 = offset$2, shift$1 = shift$2, flip$1 = flip$2, size$1 = size$2, hide$1 = hide$2, arrow$1 = arrow$2, limitShift$1 = limitShift$2, computePosition = (e, n, i) => {
	let a = /* @__PURE__ */ new Map(), o = {
		platform,
		...i
	}, s = {
		...o.platform,
		_c: a
	};
	return computePosition$1(e, n, {
		...o,
		platform: s
	});
}, index = typeof document < "u" ? useLayoutEffect : function() {};
function deepEqual(e, n) {
	if (e === n) return !0;
	if (typeof e != typeof n) return !1;
	if (typeof e == "function" && e.toString() === n.toString()) return !0;
	let i, a, o;
	if (e && n && typeof e == "object") {
		if (Array.isArray(e)) {
			if (i = e.length, i !== n.length) return !1;
			for (a = i; a-- !== 0;) if (!deepEqual(e[a], n[a])) return !1;
			return !0;
		}
		if (o = Object.keys(e), i = o.length, i !== Object.keys(n).length) return !1;
		for (a = i; a-- !== 0;) if (!{}.hasOwnProperty.call(n, o[a])) return !1;
		for (a = i; a-- !== 0;) {
			let i = o[a];
			if (!(i === "_owner" && e.$$typeof) && !deepEqual(e[i], n[i])) return !1;
		}
		return !0;
	}
	return e !== e && n !== n;
}
function getDPR(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(e, n) {
	let i = getDPR(e);
	return Math.round(n * i) / i;
}
function useLatestRef(n) {
	let i = React$1.useRef(n);
	return index(() => {
		i.current = n;
	}), i;
}
function useFloating(n) {
	n === void 0 && (n = {});
	let { placement: i = "bottom", strategy: a = "absolute", middleware: o = [], platform: s, elements: { reference: c, floating: l } = {}, transform: u = !0, whileElementsMounted: d, open: f } = n, [p, h] = React$1.useState({
		x: 0,
		y: 0,
		strategy: a,
		placement: i,
		middlewareData: {},
		isPositioned: !1
	}), [g, _] = React$1.useState(o);
	deepEqual(g, o) || _(o);
	let [v, y] = React$1.useState(null), [b, x] = React$1.useState(null), S = React$1.useCallback((e) => {
		e !== E.current && (E.current = e, y(e));
	}, []), C = React$1.useCallback((e) => {
		e !== D.current && (D.current = e, x(e));
	}, []), w = c || v, T = l || b, E = React$1.useRef(null), D = React$1.useRef(null), O = React$1.useRef(p), k = d != null, A = useLatestRef(d), j = useLatestRef(s), M = useLatestRef(f), N = React$1.useCallback(() => {
		if (!E.current || !D.current) return;
		let e = {
			placement: i,
			strategy: a,
			middleware: g
		};
		j.current && (e.platform = j.current), computePosition(E.current, D.current, e).then((e) => {
			let n = {
				...e,
				isPositioned: M.current !== !1
			};
			P.current && !deepEqual(O.current, n) && (O.current = n, ReactDOM$1.flushSync(() => {
				h(n);
			}));
		});
	}, [
		g,
		i,
		a,
		j,
		M
	]);
	index(() => {
		f === !1 && O.current.isPositioned && (O.current.isPositioned = !1, h((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [f]);
	let P = React$1.useRef(!1);
	index(() => (P.current = !0, () => {
		P.current = !1;
	}), []), index(() => {
		if (w && (E.current = w), T && (D.current = T), w && T) {
			if (A.current) return A.current(w, T, N);
			N();
		}
	}, [
		w,
		T,
		N,
		A,
		k
	]);
	let F = React$1.useMemo(() => ({
		reference: E,
		floating: D,
		setReference: S,
		setFloating: C
	}), [S, C]), I = React$1.useMemo(() => ({
		reference: w,
		floating: T
	}), [w, T]), L = React$1.useMemo(() => {
		let e = {
			position: a,
			left: 0,
			top: 0
		};
		if (!I.floating) return e;
		let n = roundByDPR(I.floating, p.x), i = roundByDPR(I.floating, p.y);
		return u ? {
			...e,
			transform: "translate(" + n + "px, " + i + "px)",
			...getDPR(I.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: a,
			left: n,
			top: i
		};
	}, [
		a,
		u,
		I.floating,
		p.x,
		p.y
	]);
	return React$1.useMemo(() => ({
		...p,
		update: N,
		refs: F,
		elements: I,
		floatingStyles: L
	}), [
		p,
		N,
		F,
		I,
		L
	]);
}
var arrow$1$1 = (e) => {
	function n(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(i) {
			let { element: a, padding: o } = typeof e == "function" ? e(i) : e;
			return a && n(a) ? a.current == null ? {} : arrow$1({
				element: a.current,
				padding: o
			}).fn(i) : a ? arrow$1({
				element: a,
				padding: o
			}).fn(i) : {};
		}
	};
}, offset = (e, n) => {
	let i = offset$1(e);
	return {
		name: i.name,
		fn: i.fn,
		options: [e, n]
	};
}, shift = (e, n) => {
	let i = shift$1(e);
	return {
		name: i.name,
		fn: i.fn,
		options: [e, n]
	};
}, limitShift = (e, n) => ({
	fn: limitShift$1(e).fn,
	options: [e, n]
}), flip = (e, n) => {
	let i = flip$1(e);
	return {
		name: i.name,
		fn: i.fn,
		options: [e, n]
	};
}, size = (e, n) => {
	let i = size$1(e);
	return {
		name: i.name,
		fn: i.fn,
		options: [e, n]
	};
}, hide = (e, n) => {
	let i = hide$1(e);
	return {
		name: i.name,
		fn: i.fn,
		options: [e, n]
	};
}, arrow = (e, n) => {
	let i = arrow$1$1(e);
	return {
		name: i.name,
		fn: i.fn,
		options: [e, n]
	};
}, NAME$1 = "Arrow", Arrow$1 = React$1.forwardRef((e, n) => {
	let { children: i, width: a = 10, height: o = 5, ...s } = e;
	return /* @__PURE__ */ jsx(Primitive.svg, {
		...s,
		ref: n,
		width: a,
		height: o,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? i : /* @__PURE__ */ jsx("polygon", { points: "0,0 30,0 15,10" })
	});
});
Arrow$1.displayName = NAME$1;
var Root = Arrow$1;
function useSize(n) {
	let [i, a] = React$1.useState(void 0);
	return useLayoutEffect2(() => {
		if (n) {
			a({
				width: n.offsetWidth,
				height: n.offsetHeight
			});
			let e = new ResizeObserver((e) => {
				if (!Array.isArray(e) || !e.length) return;
				let i = e[0], o, s;
				if ("borderBoxSize" in i) {
					let e = i.borderBoxSize, n = Array.isArray(e) ? e[0] : e;
					o = n.inlineSize, s = n.blockSize;
				} else o = n.offsetWidth, s = n.offsetHeight;
				a({
					width: o,
					height: s
				});
			});
			return e.observe(n, { box: "border-box" }), () => e.unobserve(n);
		} else a(void 0);
	}, [n]), i;
}
var POPPER_NAME = "Popper", [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME), [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME), Popper = (n) => {
	let { __scopePopper: i, children: a } = n, [o, s] = React$1.useState(null);
	return /* @__PURE__ */ jsx(PopperProvider, {
		scope: i,
		anchor: o,
		onAnchorChange: s,
		children: a
	});
};
Popper.displayName = POPPER_NAME;
var ANCHOR_NAME = "PopperAnchor", PopperAnchor = React$1.forwardRef((n, i) => {
	let { __scopePopper: a, virtualRef: o, ...s } = n, c = usePopperContext(ANCHOR_NAME, a), l = React$1.useRef(null), u = useComposedRefs(i, l), d = React$1.useRef(null);
	return React$1.useEffect(() => {
		let e = d.current;
		d.current = o?.current || l.current, e !== d.current && c.onAnchorChange(d.current);
	}), o ? null : /* @__PURE__ */ jsx(Primitive.div, {
		...s,
		ref: u
	});
});
PopperAnchor.displayName = ANCHOR_NAME;
var CONTENT_NAME$1 = "PopperContent", [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$1), PopperContent = React$1.forwardRef((n, i) => {
	let { __scopePopper: a, side: o = "bottom", sideOffset: s = 0, align: c = "center", alignOffset: l = 0, arrowPadding: u = 0, avoidCollisions: d = !0, collisionBoundary: p = [], collisionPadding: m = 0, sticky: h = "partial", hideWhenDetached: g = !1, updatePositionStrategy: _ = "optimized", onPlaced: y, ...b } = n, x = usePopperContext(CONTENT_NAME$1, a), [S, C] = React$1.useState(null), w = useComposedRefs(i, (e) => C(e)), [T, E] = React$1.useState(null), D = useSize(T), O = D?.width ?? 0, k = D?.height ?? 0, A = o + (c === "center" ? "" : "-" + c), j = typeof m == "number" ? m : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...m
	}, M = Array.isArray(p) ? p : [p], N = M.length > 0, P = {
		padding: j,
		boundary: M.filter(isNotNull),
		altBoundary: N
	}, { refs: F, floatingStyles: I, placement: L, isPositioned: R, middlewareData: z } = useFloating({
		strategy: "fixed",
		placement: A,
		whileElementsMounted: (...e) => autoUpdate(...e, { animationFrame: _ === "always" }),
		elements: { reference: x.anchor },
		middleware: [
			offset({
				mainAxis: s + k,
				alignmentAxis: l
			}),
			d && shift({
				mainAxis: !0,
				crossAxis: !1,
				limiter: h === "partial" ? limitShift() : void 0,
				...P
			}),
			d && flip({ ...P }),
			size({
				...P,
				apply: ({ elements: e, rects: n, availableWidth: i, availableHeight: a }) => {
					let { width: o, height: s } = n.reference, c = e.floating.style;
					c.setProperty("--radix-popper-available-width", `${i}px`), c.setProperty("--radix-popper-available-height", `${a}px`), c.setProperty("--radix-popper-anchor-width", `${o}px`), c.setProperty("--radix-popper-anchor-height", `${s}px`);
				}
			}),
			T && arrow({
				element: T,
				padding: u
			}),
			transformOrigin({
				arrowWidth: O,
				arrowHeight: k
			}),
			g && hide({
				strategy: "referenceHidden",
				...P
			})
		]
	}), [B, V] = getSideAndAlignFromPlacement(L), H = useCallbackRef(y);
	useLayoutEffect2(() => {
		R && H?.();
	}, [R, H]);
	let U = z.arrow?.x, W = z.arrow?.y, G = z.arrow?.centerOffset !== 0, [K, q] = React$1.useState();
	return useLayoutEffect2(() => {
		S && q(window.getComputedStyle(S).zIndex);
	}, [S]), /* @__PURE__ */ jsx("div", {
		ref: F.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...I,
			transform: R ? I.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: K,
			"--radix-popper-transform-origin": [z.transformOrigin?.x, z.transformOrigin?.y].join(" "),
			...z.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: n.dir,
		children: /* @__PURE__ */ jsx(PopperContentProvider, {
			scope: a,
			placedSide: B,
			onArrowChange: E,
			arrowX: U,
			arrowY: W,
			shouldHideArrow: G,
			children: /* @__PURE__ */ jsx(Primitive.div, {
				"data-side": B,
				"data-align": V,
				...b,
				ref: w,
				style: {
					...b.style,
					animation: R ? void 0 : "none"
				}
			})
		})
	});
});
PopperContent.displayName = CONTENT_NAME$1;
var ARROW_NAME$1 = "PopperArrow", OPPOSITE_SIDE = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, PopperArrow = React$1.forwardRef(function(e, n) {
	let { __scopePopper: i, ...a } = e, o = useContentContext(ARROW_NAME$1, i), s = OPPOSITE_SIDE[o.placedSide];
	return /* @__PURE__ */ jsx("span", {
		ref: o.onArrowChange,
		style: {
			position: "absolute",
			left: o.arrowX,
			top: o.arrowY,
			[s]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[o.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: "rotate(180deg)",
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[o.placedSide],
			visibility: o.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ jsx(Root, {
			...a,
			ref: n,
			style: {
				...a.style,
				display: "block"
			}
		})
	});
});
PopperArrow.displayName = ARROW_NAME$1;
function isNotNull(e) {
	return e !== null;
}
var transformOrigin = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(n) {
		let { placement: i, rects: a, middlewareData: o } = n, s = o.arrow?.centerOffset !== 0, c = s ? 0 : e.arrowWidth, l = s ? 0 : e.arrowHeight, [u, d] = getSideAndAlignFromPlacement(i), f = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[d], p = (o.arrow?.x ?? 0) + c / 2, m = (o.arrow?.y ?? 0) + l / 2, h = "", g = "";
		return u === "bottom" ? (h = s ? f : `${p}px`, g = `${-l}px`) : u === "top" ? (h = s ? f : `${p}px`, g = `${a.floating.height + l}px`) : u === "right" ? (h = `${-l}px`, g = s ? f : `${m}px`) : u === "left" && (h = `${a.floating.width + l}px`, g = s ? f : `${m}px`), { data: {
			x: h,
			y: g
		} };
	}
});
function getSideAndAlignFromPlacement(e) {
	let [n, i = "center"] = e.split("-");
	return [n, i];
}
var Root2$1 = Popper, Anchor = PopperAnchor, Content = PopperContent, Arrow = PopperArrow;
function usePrevious(n) {
	let i = React$1.useRef({
		value: n,
		previous: n
	});
	return React$1.useMemo(() => (i.current.value !== n && (i.current.previous = i.current.value, i.current.value = n), i.current.previous), [n]);
}
var VISUALLY_HIDDEN_STYLES = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
}), NAME = "VisuallyHidden", VisuallyHidden = React$1.forwardRef((e, n) => /* @__PURE__ */ jsx(Primitive.span, {
	...e,
	ref: n,
	style: {
		...VISUALLY_HIDDEN_STYLES,
		...e.style
	}
}));
VisuallyHidden.displayName = NAME;
var OPEN_KEYS = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], SELECTION_KEYS = [" ", "Enter"], SELECT_NAME = "Select", [Collection, useCollection, createCollectionScope] = createCollection(SELECT_NAME), [createSelectContext, createSelectScope] = createContextScope(SELECT_NAME, [createCollectionScope, createPopperScope]), usePopperScope = createPopperScope(), [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME), [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME), Select$1 = (n) => {
	let { __scopeSelect: i, children: a, open: o, defaultOpen: s, onOpenChange: c, value: l, defaultValue: u, onValueChange: d, dir: m, name: h, autoComplete: g, disabled: _, required: v, form: y } = n, b = usePopperScope(i), [x, S] = React$1.useState(null), [C, w] = React$1.useState(null), [T, E] = React$1.useState(!1), D = useDirection(m), [O, k] = useControllableState({
		prop: o,
		defaultProp: s ?? !1,
		onChange: c,
		caller: SELECT_NAME
	}), [A, j] = useControllableState({
		prop: l,
		defaultProp: u,
		onChange: d,
		caller: SELECT_NAME
	}), M = React$1.useRef(null), N = x ? y || !!x.closest("form") : !0, [P, F] = React$1.useState(/* @__PURE__ */ new Set()), I = Array.from(P).map((e) => e.props.value).join(";");
	return /* @__PURE__ */ jsx(Root2$1, {
		...b,
		children: /* @__PURE__ */ jsxs(SelectProvider, {
			required: v,
			scope: i,
			trigger: x,
			onTriggerChange: S,
			valueNode: C,
			onValueNodeChange: w,
			valueNodeHasChildren: T,
			onValueNodeHasChildrenChange: E,
			contentId: useId$1(),
			value: A,
			onValueChange: j,
			open: O,
			onOpenChange: k,
			dir: D,
			triggerPointerDownPosRef: M,
			disabled: _,
			children: [/* @__PURE__ */ jsx(Collection.Provider, {
				scope: i,
				children: /* @__PURE__ */ jsx(SelectNativeOptionsProvider, {
					scope: n.__scopeSelect,
					onNativeOptionAdd: React$1.useCallback((e) => {
						F((n) => new Set(n).add(e));
					}, []),
					onNativeOptionRemove: React$1.useCallback((e) => {
						F((n) => {
							let i = new Set(n);
							return i.delete(e), i;
						});
					}, []),
					children: a
				})
			}), N ? /* @__PURE__ */ jsxs(SelectBubbleInput, {
				"aria-hidden": !0,
				required: v,
				tabIndex: -1,
				name: h,
				autoComplete: g,
				value: A,
				onChange: (e) => j(e.target.value),
				disabled: _,
				form: y,
				children: [A === void 0 ? /* @__PURE__ */ jsx("option", { value: "" }) : null, Array.from(P)]
			}, I) : null]
		})
	});
};
Select$1.displayName = SELECT_NAME;
var TRIGGER_NAME = "SelectTrigger", SelectTrigger = React$1.forwardRef((n, i) => {
	let { __scopeSelect: a, disabled: o = !1, ...s } = n, c = usePopperScope(a), l = useSelectContext(TRIGGER_NAME, a), u = l.disabled || o, d = useComposedRefs(i, l.onTriggerChange), p = useCollection(a), m = React$1.useRef("touch"), [h, g, _] = useTypeaheadSearch((e) => {
		let n = p().filter((e) => !e.disabled), i = findNextItem(n, e, n.find((e) => e.value === l.value));
		i !== void 0 && l.onValueChange(i.value);
	}), y = (e) => {
		u || (l.onOpenChange(!0), _()), e && (l.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	};
	return /* @__PURE__ */ jsx(Anchor, {
		asChild: !0,
		...c,
		children: /* @__PURE__ */ jsx(Primitive.button, {
			type: "button",
			role: "combobox",
			"aria-controls": l.contentId,
			"aria-expanded": l.open,
			"aria-required": l.required,
			"aria-autocomplete": "none",
			dir: l.dir,
			"data-state": l.open ? "open" : "closed",
			disabled: u,
			"data-disabled": u ? "" : void 0,
			"data-placeholder": shouldShowPlaceholder(l.value) ? "" : void 0,
			...s,
			ref: d,
			onClick: composeEventHandlers(s.onClick, (e) => {
				e.currentTarget.focus(), m.current !== "mouse" && y(e);
			}),
			onPointerDown: composeEventHandlers(s.onPointerDown, (e) => {
				m.current = e.pointerType;
				let n = e.target;
				n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (y(e), e.preventDefault());
			}),
			onKeyDown: composeEventHandlers(s.onKeyDown, (e) => {
				let n = h.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && g(e.key), !(n && e.key === " ") && OPEN_KEYS.includes(e.key) && (y(), e.preventDefault());
			})
		})
	});
});
SelectTrigger.displayName = TRIGGER_NAME;
var VALUE_NAME = "SelectValue", SelectValue = React$1.forwardRef((e, n) => {
	let { __scopeSelect: i, className: a, style: o, children: s, placeholder: c = "", ...l } = e, u = useSelectContext(VALUE_NAME, i), { onValueNodeHasChildrenChange: p } = u, m = s !== void 0, h = useComposedRefs(n, u.onValueNodeChange);
	return useLayoutEffect2(() => {
		p(m);
	}, [p, m]), /* @__PURE__ */ jsx(Primitive.span, {
		...l,
		ref: h,
		style: { pointerEvents: "none" },
		children: shouldShowPlaceholder(u.value) ? /* @__PURE__ */ jsx(Fragment, { children: c }) : s
	});
});
SelectValue.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon", SelectIcon = React$1.forwardRef((e, n) => {
	let { __scopeSelect: i, children: a, ...o } = e;
	return /* @__PURE__ */ jsx(Primitive.span, {
		"aria-hidden": !0,
		...o,
		ref: n,
		children: a || "▼"
	});
});
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME = "SelectPortal", SelectPortal = (e) => /* @__PURE__ */ jsx(Portal, {
	asChild: !0,
	...e
});
SelectPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "SelectContent", SelectContent = React$1.forwardRef((n, i) => {
	let a = useSelectContext(CONTENT_NAME, n.__scopeSelect), [o, s] = React$1.useState();
	if (useLayoutEffect2(() => {
		s(new DocumentFragment());
	}, []), !a.open) {
		let e = o;
		return e ? ReactDOM$1.createPortal(/* @__PURE__ */ jsx(SelectContentProvider, {
			scope: n.__scopeSelect,
			children: /* @__PURE__ */ jsx(Collection.Slot, {
				scope: n.__scopeSelect,
				children: /* @__PURE__ */ jsx("div", { children: n.children })
			})
		}), e) : null;
	}
	return /* @__PURE__ */ jsx(SelectContentImpl, {
		...n,
		ref: i
	});
});
SelectContent.displayName = CONTENT_NAME;
var CONTENT_MARGIN = 10, [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME), CONTENT_IMPL_NAME = "SelectContentImpl", Slot = /* @__PURE__ */ createSlot("SelectContent.RemoveScroll"), SelectContentImpl = React$1.forwardRef((n, i) => {
	let { __scopeSelect: a, position: o = "item-aligned", onCloseAutoFocus: s, onEscapeKeyDown: c, onPointerDownOutside: l, side: u, sideOffset: d, align: p, alignOffset: m, arrowPadding: h, collisionBoundary: g, collisionPadding: _, sticky: y, hideWhenDetached: b, avoidCollisions: x, ...S } = n, C = useSelectContext(CONTENT_NAME, a), [w, T] = React$1.useState(null), [E, D] = React$1.useState(null), O = useComposedRefs(i, (e) => T(e)), [k, A] = React$1.useState(null), [j, M] = React$1.useState(null), N = useCollection(a), [P, F] = React$1.useState(!1), I = React$1.useRef(!1);
	React$1.useEffect(() => {
		if (w) return hideOthers(w);
	}, [w]), useFocusGuards();
	let L = React$1.useCallback((e) => {
		let [n, ...i] = N().map((e) => e.ref.current), [a] = i.slice(-1), o = document.activeElement;
		for (let i of e) if (i === o || (i?.scrollIntoView({ block: "nearest" }), i === n && E && (E.scrollTop = 0), i === a && E && (E.scrollTop = E.scrollHeight), i?.focus(), document.activeElement !== o)) return;
	}, [N, E]), R = React$1.useCallback(() => L([k, w]), [
		L,
		k,
		w
	]);
	React$1.useEffect(() => {
		P && R();
	}, [P, R]);
	let { onOpenChange: z, triggerPointerDownPosRef: B } = C;
	React$1.useEffect(() => {
		if (w) {
			let e = {
				x: 0,
				y: 0
			}, n = (n) => {
				e = {
					x: Math.abs(Math.round(n.pageX) - (B.current?.x ?? 0)),
					y: Math.abs(Math.round(n.pageY) - (B.current?.y ?? 0))
				};
			}, i = (i) => {
				e.x <= 10 && e.y <= 10 ? i.preventDefault() : w.contains(i.target) || z(!1), document.removeEventListener("pointermove", n), B.current = null;
			};
			return B.current !== null && (document.addEventListener("pointermove", n), document.addEventListener("pointerup", i, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", n), document.removeEventListener("pointerup", i, { capture: !0 });
			};
		}
	}, [
		w,
		z,
		B
	]), React$1.useEffect(() => {
		let e = () => z(!1);
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [z]);
	let [V, H] = useTypeaheadSearch((e) => {
		let n = N().filter((e) => !e.disabled), i = findNextItem(n, e, n.find((e) => e.ref.current === document.activeElement));
		i && setTimeout(() => i.ref.current.focus());
	}), U = React$1.useCallback((e, n, i) => {
		let a = !I.current && !i;
		(C.value !== void 0 && C.value === n || a) && (A(e), a && (I.current = !0));
	}, [C.value]), W = React$1.useCallback(() => w?.focus(), [w]), G = React$1.useCallback((e, n, i) => {
		let a = !I.current && !i;
		(C.value !== void 0 && C.value === n || a) && M(e);
	}, [C.value]), K = o === "popper" ? SelectPopperPosition : SelectItemAlignedPosition, q = K === SelectPopperPosition ? {
		side: u,
		sideOffset: d,
		align: p,
		alignOffset: m,
		arrowPadding: h,
		collisionBoundary: g,
		collisionPadding: _,
		sticky: y,
		hideWhenDetached: b,
		avoidCollisions: x
	} : {};
	return /* @__PURE__ */ jsx(SelectContentProvider, {
		scope: a,
		content: w,
		viewport: E,
		onViewportChange: D,
		itemRefCallback: U,
		selectedItem: k,
		onItemLeave: W,
		itemTextRefCallback: G,
		focusSelectedItem: R,
		selectedItemText: j,
		position: o,
		isPositioned: P,
		searchRef: V,
		children: /* @__PURE__ */ jsx(Combination_default, {
			as: Slot,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ jsx(FocusScope, {
				asChild: !0,
				trapped: C.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: composeEventHandlers(s, (e) => {
					C.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ jsx(DismissableLayer, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: c,
					onPointerDownOutside: l,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => C.onOpenChange(!1),
					children: /* @__PURE__ */ jsx(K, {
						role: "listbox",
						id: C.contentId,
						"data-state": C.open ? "open" : "closed",
						dir: C.dir,
						onContextMenu: (e) => e.preventDefault(),
						...S,
						...q,
						onPlaced: () => F(!0),
						ref: O,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...S.style
						},
						onKeyDown: composeEventHandlers(S.onKeyDown, (e) => {
							let n = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !n && e.key.length === 1 && H(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let n = N().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (n = n.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let i = e.target, a = n.indexOf(i);
									n = n.slice(a + 1);
								}
								setTimeout(() => L(n)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
});
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition", SelectItemAlignedPosition = React$1.forwardRef((n, i) => {
	let { __scopeSelect: a, onPlaced: o, ...s } = n, c = useSelectContext(CONTENT_NAME, a), l = useSelectContentContext(CONTENT_NAME, a), [u, d] = React$1.useState(null), [p, m] = React$1.useState(null), h = useComposedRefs(i, (e) => m(e)), g = useCollection(a), _ = React$1.useRef(!1), y = React$1.useRef(!0), { viewport: b, selectedItem: x, selectedItemText: S, focusSelectedItem: C } = l, w = React$1.useCallback(() => {
		if (c.trigger && c.valueNode && u && p && b && x && S) {
			let e = c.trigger.getBoundingClientRect(), n = p.getBoundingClientRect(), i = c.valueNode.getBoundingClientRect(), a = S.getBoundingClientRect();
			if (c.dir !== "rtl") {
				let o = a.left - n.left, s = i.left - o, c = e.left - s, l = e.width + c, d = Math.max(l, n.width), f = window.innerWidth - CONTENT_MARGIN, p = clamp(s, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, f - d)]);
				u.style.minWidth = l + "px", u.style.left = p + "px";
			} else {
				let o = n.right - a.right, s = window.innerWidth - i.right - o, c = window.innerWidth - e.right - s, l = e.width + c, d = Math.max(l, n.width), f = window.innerWidth - CONTENT_MARGIN, p = clamp(s, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, f - d)]);
				u.style.minWidth = l + "px", u.style.right = p + "px";
			}
			let s = g(), l = window.innerHeight - CONTENT_MARGIN * 2, d = b.scrollHeight, f = window.getComputedStyle(p), m = parseInt(f.borderTopWidth, 10), h = parseInt(f.paddingTop, 10), v = parseInt(f.borderBottomWidth, 10), y = parseInt(f.paddingBottom, 10), C = m + h + d + y + v, w = Math.min(x.offsetHeight * 5, C), T = window.getComputedStyle(b), E = parseInt(T.paddingTop, 10), D = parseInt(T.paddingBottom, 10), O = e.top + e.height / 2 - CONTENT_MARGIN, k = l - O, A = x.offsetHeight / 2, j = x.offsetTop + A, M = m + h + j, N = C - M;
			if (M <= O) {
				let e = s.length > 0 && x === s[s.length - 1].ref.current;
				u.style.bottom = "0px";
				let n = p.clientHeight - b.offsetTop - b.offsetHeight, i = M + Math.max(k, A + (e ? D : 0) + n + v);
				u.style.height = i + "px";
			} else {
				let e = s.length > 0 && x === s[0].ref.current;
				u.style.top = "0px";
				let n = Math.max(O, m + b.offsetTop + (e ? E : 0) + A) + N;
				u.style.height = n + "px", b.scrollTop = M - O + b.offsetTop;
			}
			u.style.margin = `${CONTENT_MARGIN}px 0`, u.style.minHeight = w + "px", u.style.maxHeight = l + "px", o?.(), requestAnimationFrame(() => _.current = !0);
		}
	}, [
		g,
		c.trigger,
		c.valueNode,
		u,
		p,
		b,
		x,
		S,
		c.dir,
		o
	]);
	useLayoutEffect2(() => w(), [w]);
	let [T, E] = React$1.useState();
	return useLayoutEffect2(() => {
		p && E(window.getComputedStyle(p).zIndex);
	}, [p]), /* @__PURE__ */ jsx(SelectViewportProvider, {
		scope: a,
		contentWrapper: u,
		shouldExpandOnScrollRef: _,
		onScrollButtonChange: React$1.useCallback((e) => {
			e && y.current === !0 && (w(), C?.(), y.current = !1);
		}, [w, C]),
		children: /* @__PURE__ */ jsx("div", {
			ref: d,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: T
			},
			children: /* @__PURE__ */ jsx(Primitive.div, {
				...s,
				ref: h,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...s.style
				}
			})
		})
	});
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition", SelectPopperPosition = React$1.forwardRef((e, n) => {
	let { __scopeSelect: i, align: a = "start", collisionPadding: o = CONTENT_MARGIN, ...s } = e;
	return /* @__PURE__ */ jsx(Content, {
		...usePopperScope(i),
		...s,
		ref: n,
		align: a,
		collisionPadding: o,
		style: {
			boxSizing: "border-box",
			...s.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME, {}), VIEWPORT_NAME = "SelectViewport", SelectViewport = React$1.forwardRef((n, i) => {
	let { __scopeSelect: a, nonce: o, ...s } = n, c = useSelectContentContext(VIEWPORT_NAME, a), l = useSelectViewportContext(VIEWPORT_NAME, a), u = useComposedRefs(i, c.onViewportChange), m = React$1.useRef(0);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: o
	}), /* @__PURE__ */ jsx(Collection.Slot, {
		scope: a,
		children: /* @__PURE__ */ jsx(Primitive.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...s,
			ref: u,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...s.style
			},
			onScroll: composeEventHandlers(s.onScroll, (e) => {
				let n = e.currentTarget, { contentWrapper: i, shouldExpandOnScrollRef: a } = l;
				if (a?.current && i) {
					let e = Math.abs(m.current - n.scrollTop);
					if (e > 0) {
						let a = window.innerHeight - CONTENT_MARGIN * 2, o = parseFloat(i.style.minHeight), s = parseFloat(i.style.height), c = Math.max(o, s);
						if (c < a) {
							let o = c + e, s = Math.min(a, o), l = o - s;
							i.style.height = s + "px", i.style.bottom === "0px" && (n.scrollTop = l > 0 ? l : 0, i.style.justifyContent = "flex-end");
						}
					}
				}
				m.current = n.scrollTop;
			})
		})
	})] });
});
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME = "SelectGroup", [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME), SelectGroup = React$1.forwardRef((e, n) => {
	let { __scopeSelect: i, ...a } = e, o = useId$1();
	return /* @__PURE__ */ jsx(SelectGroupContextProvider, {
		scope: i,
		id: o,
		children: /* @__PURE__ */ jsx(Primitive.div, {
			role: "group",
			"aria-labelledby": o,
			...a,
			ref: n
		})
	});
});
SelectGroup.displayName = GROUP_NAME;
var LABEL_NAME = "SelectLabel", SelectLabel = React$1.forwardRef((e, n) => {
	let { __scopeSelect: i, ...a } = e, o = useSelectGroupContext(LABEL_NAME, i);
	return /* @__PURE__ */ jsx(Primitive.div, {
		id: o.id,
		...a,
		ref: n
	});
});
SelectLabel.displayName = LABEL_NAME;
var ITEM_NAME = "SelectItem", [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME), SelectItem = React$1.forwardRef((n, i) => {
	let { __scopeSelect: a, value: o, disabled: s = !1, textValue: c, ...l } = n, u = useSelectContext(ITEM_NAME, a), d = useSelectContentContext(ITEM_NAME, a), p = u.value === o, [m, h] = React$1.useState(c ?? ""), [g, _] = React$1.useState(!1), y = useComposedRefs(i, (e) => d.itemRefCallback?.(e, o, s)), b = useId$1(), x = React$1.useRef("touch"), S = () => {
		s || (u.onValueChange(o), u.onOpenChange(!1));
	};
	if (o === "") throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ jsx(SelectItemContextProvider, {
		scope: a,
		value: o,
		disabled: s,
		textId: b,
		isSelected: p,
		onItemTextChange: React$1.useCallback((e) => {
			h((n) => n || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ jsx(Collection.ItemSlot, {
			scope: a,
			value: o,
			disabled: s,
			textValue: m,
			children: /* @__PURE__ */ jsx(Primitive.div, {
				role: "option",
				"aria-labelledby": b,
				"data-highlighted": g ? "" : void 0,
				"aria-selected": p && g,
				"data-state": p ? "checked" : "unchecked",
				"aria-disabled": s || void 0,
				"data-disabled": s ? "" : void 0,
				tabIndex: s ? void 0 : -1,
				...l,
				ref: y,
				onFocus: composeEventHandlers(l.onFocus, () => _(!0)),
				onBlur: composeEventHandlers(l.onBlur, () => _(!1)),
				onClick: composeEventHandlers(l.onClick, () => {
					x.current !== "mouse" && S();
				}),
				onPointerUp: composeEventHandlers(l.onPointerUp, () => {
					x.current === "mouse" && S();
				}),
				onPointerDown: composeEventHandlers(l.onPointerDown, (e) => {
					x.current = e.pointerType;
				}),
				onPointerMove: composeEventHandlers(l.onPointerMove, (e) => {
					x.current = e.pointerType, s ? d.onItemLeave?.() : x.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: composeEventHandlers(l.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && d.onItemLeave?.();
				}),
				onKeyDown: composeEventHandlers(l.onKeyDown, (e) => {
					d.searchRef?.current !== "" && e.key === " " || (SELECTION_KEYS.includes(e.key) && S(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
});
SelectItem.displayName = ITEM_NAME;
var ITEM_TEXT_NAME = "SelectItemText", SelectItemText = React$1.forwardRef((n, i) => {
	let { __scopeSelect: a, className: o, style: s, ...c } = n, l = useSelectContext(ITEM_TEXT_NAME, a), u = useSelectContentContext(ITEM_TEXT_NAME, a), h = useSelectItemContext(ITEM_TEXT_NAME, a), g = useSelectNativeOptionsContext(ITEM_TEXT_NAME, a), [_, y] = React$1.useState(null), b = useComposedRefs(i, (e) => y(e), h.onItemTextChange, (e) => u.itemTextRefCallback?.(e, h.value, h.disabled)), x = _?.textContent, S = React$1.useMemo(() => /* @__PURE__ */ jsx("option", {
		value: h.value,
		disabled: h.disabled,
		children: x
	}, h.value), [
		h.disabled,
		h.value,
		x
	]), { onNativeOptionAdd: C, onNativeOptionRemove: w } = g;
	return useLayoutEffect2(() => (C(S), () => w(S)), [
		C,
		w,
		S
	]), /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Primitive.span, {
		id: h.textId,
		...c,
		ref: b
	}), h.isSelected && l.valueNode && !l.valueNodeHasChildren ? ReactDOM$1.createPortal(c.children, l.valueNode) : null] });
});
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator", SelectItemIndicator = React$1.forwardRef((e, n) => {
	let { __scopeSelect: i, ...a } = e;
	return useSelectItemContext(ITEM_INDICATOR_NAME, i).isSelected ? /* @__PURE__ */ jsx(Primitive.span, {
		"aria-hidden": !0,
		...a,
		ref: n
	}) : null;
});
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton", SelectScrollUpButton = React$1.forwardRef((n, i) => {
	let a = useSelectContentContext(SCROLL_UP_BUTTON_NAME, n.__scopeSelect), o = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, n.__scopeSelect), [s, c] = React$1.useState(!1), l = useComposedRefs(i, o.onScrollButtonChange);
	return useLayoutEffect2(() => {
		if (a.viewport && a.isPositioned) {
			let e = function() {
				c(n.scrollTop > 0);
			}, n = a.viewport;
			return e(), n.addEventListener("scroll", e), () => n.removeEventListener("scroll", e);
		}
	}, [a.viewport, a.isPositioned]), s ? /* @__PURE__ */ jsx(SelectScrollButtonImpl, {
		...n,
		ref: l,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: n } = a;
			e && n && (e.scrollTop -= n.offsetHeight);
		}
	}) : null;
});
SelectScrollUpButton.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton", SelectScrollDownButton = React$1.forwardRef((n, i) => {
	let a = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, n.__scopeSelect), o = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, n.__scopeSelect), [s, c] = React$1.useState(!1), l = useComposedRefs(i, o.onScrollButtonChange);
	return useLayoutEffect2(() => {
		if (a.viewport && a.isPositioned) {
			let e = function() {
				let e = n.scrollHeight - n.clientHeight;
				c(Math.ceil(n.scrollTop) < e);
			}, n = a.viewport;
			return e(), n.addEventListener("scroll", e), () => n.removeEventListener("scroll", e);
		}
	}, [a.viewport, a.isPositioned]), s ? /* @__PURE__ */ jsx(SelectScrollButtonImpl, {
		...n,
		ref: l,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: n } = a;
			e && n && (e.scrollTop += n.offsetHeight);
		}
	}) : null;
});
SelectScrollDownButton.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = React$1.forwardRef((n, i) => {
	let { __scopeSelect: a, onAutoScroll: o, ...s } = n, c = useSelectContentContext("SelectScrollButton", a), l = React$1.useRef(null), u = useCollection(a), d = React$1.useCallback(() => {
		l.current !== null && (window.clearInterval(l.current), l.current = null);
	}, []);
	return React$1.useEffect(() => () => d(), [d]), useLayoutEffect2(() => {
		u().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [u]), /* @__PURE__ */ jsx(Primitive.div, {
		"aria-hidden": !0,
		...s,
		ref: i,
		style: {
			flexShrink: 0,
			...s.style
		},
		onPointerDown: composeEventHandlers(s.onPointerDown, () => {
			l.current === null && (l.current = window.setInterval(o, 50));
		}),
		onPointerMove: composeEventHandlers(s.onPointerMove, () => {
			c.onItemLeave?.(), l.current === null && (l.current = window.setInterval(o, 50));
		}),
		onPointerLeave: composeEventHandlers(s.onPointerLeave, () => {
			d();
		})
	});
}), SEPARATOR_NAME = "SelectSeparator", SelectSeparator = React$1.forwardRef((e, n) => {
	let { __scopeSelect: i, ...a } = e;
	return /* @__PURE__ */ jsx(Primitive.div, {
		"aria-hidden": !0,
		...a,
		ref: n
	});
});
SelectSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME = "SelectArrow", SelectArrow = React$1.forwardRef((e, n) => {
	let { __scopeSelect: i, ...a } = e, o = usePopperScope(i), s = useSelectContext(ARROW_NAME, i), c = useSelectContentContext(ARROW_NAME, i);
	return s.open && c.position === "popper" ? /* @__PURE__ */ jsx(Arrow, {
		...o,
		...a,
		ref: n
	}) : null;
});
SelectArrow.displayName = ARROW_NAME;
var BUBBLE_INPUT_NAME = "SelectBubbleInput", SelectBubbleInput = React$1.forwardRef(({ __scopeSelect: n, value: i, ...a }, o) => {
	let s = React$1.useRef(null), c = useComposedRefs(o, s), l = usePrevious(i);
	return React$1.useEffect(() => {
		let e = s.current;
		if (!e) return;
		let n = window.HTMLSelectElement.prototype, a = Object.getOwnPropertyDescriptor(n, "value").set;
		if (l !== i && a) {
			let n = new Event("change", { bubbles: !0 });
			a.call(e, i), e.dispatchEvent(n);
		}
	}, [l, i]), /* @__PURE__ */ jsx(Primitive.select, {
		...a,
		style: {
			...VISUALLY_HIDDEN_STYLES,
			...a.style
		},
		ref: c,
		defaultValue: i
	});
});
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function shouldShowPlaceholder(e) {
	return e === "" || e === void 0;
}
function useTypeaheadSearch(n) {
	let i = useCallbackRef(n), a = React$1.useRef(""), o = React$1.useRef(0), s = React$1.useCallback((e) => {
		let n = a.current + e;
		i(n), (function e(n) {
			a.current = n, window.clearTimeout(o.current), n !== "" && (o.current = window.setTimeout(() => e(""), 1e3));
		})(n);
	}, [i]), c = React$1.useCallback(() => {
		a.current = "", window.clearTimeout(o.current);
	}, []);
	return React$1.useEffect(() => () => window.clearTimeout(o.current), []), [
		a,
		s,
		c
	];
}
function findNextItem(e, n, i) {
	let a = n.length > 1 && Array.from(n).every((e) => e === n[0]) ? n[0] : n, o = i ? e.indexOf(i) : -1, s = wrapArray(e, Math.max(o, 0));
	a.length === 1 && (s = s.filter((e) => e !== i));
	let c = s.find((e) => e.textValue.toLowerCase().startsWith(a.toLowerCase()));
	return c === i ? void 0 : c;
}
function wrapArray(e, n) {
	return e.map((i, a) => e[(n + a) % e.length]);
}
var Root2 = Select$1, Trigger = SelectTrigger, Value = SelectValue, Icon = SelectIcon, Portal$1 = SelectPortal, Content2 = SelectContent, Viewport = SelectViewport, Item = SelectItem, ItemText = SelectItemText, ItemIndicator = SelectItemIndicator;
const selectContent = [
	"relative z-50 overflow-hidden rounded-md border border-border bg-surface-elevated text-text-primary shadow-[var(--shadow-card-raised)]",
	"min-w-[var(--radix-select-trigger-width)]",
	"max-h-[min(var(--radix-select-content-available-height),16rem)]"
].join(" "), selectItem = [
	"relative flex cursor-default select-none items-center rounded-sm py-2 pr-8 pl-3 text-sm outline-none",
	"data-highlighted:bg-surface data-highlighted:text-text-primary",
	"data-disabled:pointer-events-none data-disabled:opacity-50"
].join(" ");
var Select = React$1.forwardRef(({ options: e, value: n, defaultValue: i, onValueChange: a, placeholder: o = "Select…", disabled: s = !1, errorMessage: l, id: u, variant: d }, m) => {
	let h = useId(), g = u ?? h, _ = `${g}-error`, v = !!l;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full flex-col gap-1.5",
		children: [/* @__PURE__ */ jsxs(Root2, {
			value: n,
			defaultValue: i,
			onValueChange: a,
			disabled: s,
			children: [/* @__PURE__ */ jsx("div", {
				"data-variant": d,
				"data-invalid": v || void 0,
				className: fieldVariants({
					variant: d,
					invalid: v
				}),
				children: /* @__PURE__ */ jsxs(Trigger, {
					ref: m,
					id: g,
					"aria-invalid": v || void 0,
					"aria-describedby": v ? _ : void 0,
					className: "flex h-full w-full min-w-0 items-center justify-between gap-2 bg-transparent text-sm outline-none disabled:cursor-not-allowed",
					children: [/* @__PURE__ */ jsx(Value, {
						placeholder: o,
						className: "truncate text-text-primary data-placeholder:text-text-subtle"
					}), /* @__PURE__ */ jsx(Icon, {
						asChild: !0,
						children: /* @__PURE__ */ jsx(ChevronDown, {
							className: "size-4 shrink-0 text-text-muted",
							"aria-hidden": !0
						})
					})]
				})
			}), /* @__PURE__ */ jsx(Portal$1, { children: /* @__PURE__ */ jsx(Content2, {
				className: selectContent,
				position: "popper",
				sideOffset: 4,
				children: /* @__PURE__ */ jsx(Viewport, {
					className: "p-1",
					children: e.map((e) => /* @__PURE__ */ jsxs(Item, {
						value: e.value,
						disabled: e.disabled,
						className: selectItem,
						children: [/* @__PURE__ */ jsx(ItemText, { children: e.label }), /* @__PURE__ */ jsx(ItemIndicator, {
							className: "absolute right-2 inline-flex size-4 items-center justify-center text-text-muted",
							children: /* @__PURE__ */ jsx(Check, {
								className: "size-4",
								"aria-hidden": !0
							})
						})]
					}, e.value))
				})
			}) })]
		}), l ? /* @__PURE__ */ jsx("p", {
			id: _,
			role: "alert",
			className: "text-xs text-error",
			children: l
		}) : null]
	});
});
Select.displayName = "Select";
const THEME_IDS = [
	"ink",
	"clay",
	"moss",
	"mist",
	"neutral"
], DEFAULT_THEME = "ink";
var STORAGE_KEY = "tokonoma-theme";
function setTheme(e) {
	document.documentElement.setAttribute("data-theme", e);
}
function getTheme() {
	let e = document.documentElement.getAttribute("data-theme");
	return e && THEME_IDS.includes(e) ? e : "ink";
}
function setThemeWithPersistence(e) {
	setTheme(e);
	try {
		localStorage.setItem(STORAGE_KEY, e);
	} catch {}
}
function initTheme() {
	let e = "ink";
	try {
		let n = localStorage.getItem(STORAGE_KEY);
		n && THEME_IDS.includes(n) && (e = n);
	} catch {}
	return setTheme(e), e;
}
export { Button, ButtonLink, Card, CardContent, CardDescription, CardFooter, CardHeader, CardMedia, CardTitle, DEFAULT_THEME, Input, Label, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalTrigger, Select, THEME_IDS, getTheme, initTheme, setTheme, setThemeWithPersistence };
