import * as React$1 from "react";
import React, { createContext, createElement, forwardRef, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as ReactDOM$1 from "react-dom";
import ReactDOM from "react-dom";
var __defProp = Object.defineProperty, __export = (e) => {
	let t = {};
	for (var n in e) __defProp(t, n, {
		get: e[n],
		enumerable: !0
	});
	return t;
};
function setRef$2(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function composeRefs$1(...e) {
	return (t) => {
		let n = !1, i = e.map((e) => {
			let i = setRef$2(e, t);
			return !n && typeof i == "function" && (n = !0), i;
		});
		if (n) return () => {
			for (let t = 0; t < i.length; t++) {
				let n = i[t];
				typeof n == "function" ? n() : setRef$2(e[t], null);
			}
		};
	};
}
function useComposedRefs$1(...t) {
	return React$1.useCallback(composeRefs$1(...t), t);
}
var REACT_LAZY_TYPE$1 = Symbol.for("react.lazy"), use$1 = React$1.use;
function isPromiseLike$1(e) {
	return typeof e == "object" && !!e && "then" in e;
}
function isLazyComponent$1(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === REACT_LAZY_TYPE$1 && "_payload" in e && isPromiseLike$1(e._payload);
}
/* @__NO_SIDE_EFFECTS__ */
function createSlot$2(t) {
	let n = /* @__PURE__ */ createSlotClone$1(t), i = React$1.forwardRef((t, i) => {
		let { children: a, ...o } = t;
		isLazyComponent$1(a) && typeof use$1 == "function" && (a = use$1(a._payload));
		let s = React$1.Children.toArray(a), c = s.find(isSlottable$2);
		if (c) {
			let t = c.props.children, a = s.map((n) => n === c ? React$1.Children.count(t) > 1 ? React$1.Children.only(null) : React$1.isValidElement(t) ? t.props.children : null : n);
			return /* @__PURE__ */ jsx(n, {
				...o,
				ref: i,
				children: React$1.isValidElement(t) ? React$1.cloneElement(t, void 0, a) : null
			});
		}
		return /* @__PURE__ */ jsx(n, {
			...o,
			ref: i,
			children: a
		});
	});
	return i.displayName = `${t}.Slot`, i;
}
var Slot$3 = /* @__PURE__ */ createSlot$2("Slot");
/* @__NO_SIDE_EFFECTS__ */
function createSlotClone$1(t) {
	let n = React$1.forwardRef((t, n) => {
		let { children: i, ...a } = t;
		if (isLazyComponent$1(i) && typeof use$1 == "function" && (i = use$1(i._payload)), React$1.isValidElement(i)) {
			let t = getElementRef$4(i), o = mergeProps$2(a, i.props);
			return i.type !== React$1.Fragment && (o.ref = n ? composeRefs$1(n, t) : t), React$1.cloneElement(i, o);
		}
		return React$1.Children.count(i) > 1 ? React$1.Children.only(null) : null;
	});
	return n.displayName = `${t}.SlotClone`, n;
}
var SLOTTABLE_IDENTIFIER$2 = Symbol("radix.slottable");
function isSlottable$2(t) {
	return React$1.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === SLOTTABLE_IDENTIFIER$2;
}
function mergeProps$2(e, t) {
	let n = { ...t };
	for (let i in t) {
		let a = e[i], o = t[i];
		/^on[A-Z]/.test(i) ? a && o ? n[i] = (...e) => {
			let t = o(...e);
			return a(...e), t;
		} : a && (n[i] = a) : i === "style" ? n[i] = {
			...a,
			...o
		} : i === "className" && (n[i] = [a, o].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function getElementRef$4(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function r(e) {
	var t, n, i = "";
	if (typeof e == "string" || typeof e == "number") i += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var a = e.length;
		for (t = 0; t < a; t++) e[t] && (n = r(e[t])) && (i && (i += " "), i += n);
	} else for (n in e) e[n] && (i && (i += " "), i += n);
	return i;
}
function clsx() {
	for (var e, t, n = 0, i = "", a = arguments.length; n < a; n++) (e = arguments[n]) && (t = r(e)) && (i && (i += " "), i += t);
	return i;
}
var concatArrays = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let i = 0; i < t.length; i++) n[e.length + i] = t[i];
	return n;
}, createClassValidatorObject = (e, t) => ({
	classGroupId: e,
	validator: t
}), createClassPartObject = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), CLASS_PART_SEPARATOR = "-", EMPTY_CONFLICTS = [], ARBITRARY_PROPERTY_PREFIX = "arbitrary..", createClassGroupUtils = (e) => {
	let t = createClassMap(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: i } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return getGroupIdForArbitraryProperty(e);
			let n = e.split(CLASS_PART_SEPARATOR);
			return getGroupRecursive(n, n[0] === "" && n.length > 1 ? 1 : 0, t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = i[e], a = n[e];
				return t ? a ? concatArrays(a, t) : t : a || EMPTY_CONFLICTS;
			}
			return n[e] || EMPTY_CONFLICTS;
		}
	};
}, getGroupRecursive = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let i = e[t], a = n.nextPart.get(i);
	if (a) {
		let n = getGroupRecursive(e, t + 1, a);
		if (n) return n;
	}
	let o = n.validators;
	if (o === null) return;
	let s = t === 0 ? e.join(CLASS_PART_SEPARATOR) : e.slice(t).join(CLASS_PART_SEPARATOR), c = o.length;
	for (let e = 0; e < c; e++) {
		let t = o[e];
		if (t.validator(s)) return t.classGroupId;
	}
}, getGroupIdForArbitraryProperty = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), i = t.slice(0, n);
	return i ? ARBITRARY_PROPERTY_PREFIX + i : void 0;
})(), createClassMap = (e) => {
	let { theme: t, classGroups: n } = e;
	return processClassGroups(n, t);
}, processClassGroups = (e, t) => {
	let n = createClassPartObject();
	for (let i in e) {
		let a = e[i];
		processClassesRecursively(a, n, i, t);
	}
	return n;
}, processClassesRecursively = (e, t, n, i) => {
	let a = e.length;
	for (let o = 0; o < a; o++) {
		let a = e[o];
		processClassDefinition(a, t, n, i);
	}
}, processClassDefinition = (e, t, n, i) => {
	if (typeof e == "string") {
		processStringDefinition(e, t, n);
		return;
	}
	if (typeof e == "function") {
		processFunctionDefinition(e, t, n, i);
		return;
	}
	processObjectDefinition(e, t, n, i);
}, processStringDefinition = (e, t, n) => {
	let i = e === "" ? t : getPart(t, e);
	i.classGroupId = n;
}, processFunctionDefinition = (e, t, n, i) => {
	if (isThemeGetter(e)) {
		processClassesRecursively(e(i), t, n, i);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(createClassValidatorObject(n, e));
}, processObjectDefinition = (e, t, n, i) => {
	let a = Object.entries(e), o = a.length;
	for (let e = 0; e < o; e++) {
		let [o, s] = a[e];
		processClassesRecursively(s, getPart(t, o), n, i);
	}
}, getPart = (e, t) => {
	let n = e, i = t.split(CLASS_PART_SEPARATOR), a = i.length;
	for (let e = 0; e < a; e++) {
		let t = i[e], a = n.nextPart.get(t);
		a || (a = createClassPartObject(), n.nextPart.set(t, a)), n = a;
	}
	return n;
}, isThemeGetter = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, createLruCache = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), i = Object.create(null), a = (a, o) => {
		n[a] = o, t++, t > e && (t = 0, i = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = i[e]) !== void 0) return a(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : a(e, t);
		}
	};
}, IMPORTANT_MODIFIER = "!", MODIFIER_SEPARATOR = ":", EMPTY_MODIFIERS = [], createResultObject = (e, t, n, i, a) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: i,
	isExternal: a
}), createParseClassName = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, i = (e) => {
		let t = [], n = 0, i = 0, a = 0, o, s = e.length;
		for (let c = 0; c < s; c++) {
			let s = e[c];
			if (n === 0 && i === 0) {
				if (s === MODIFIER_SEPARATOR) {
					t.push(e.slice(a, c)), a = c + 1;
					continue;
				}
				if (s === "/") {
					o = c;
					continue;
				}
			}
			s === "[" ? n++ : s === "]" ? n-- : s === "(" ? i++ : s === ")" && i--;
		}
		let c = t.length === 0 ? e : e.slice(a), l = c, u = !1;
		c.endsWith(IMPORTANT_MODIFIER) ? (l = c.slice(0, -1), u = !0) : c.startsWith(IMPORTANT_MODIFIER) && (l = c.slice(1), u = !0);
		let d = o && o > a ? o - a : void 0;
		return createResultObject(t, u, l, d);
	};
	if (t) {
		let e = t + MODIFIER_SEPARATOR, n = i;
		i = (t) => t.startsWith(e) ? n(t.slice(e.length)) : createResultObject(EMPTY_MODIFIERS, !1, t, void 0, !0);
	}
	if (n) {
		let e = i;
		i = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return i;
}, createSortModifiers = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], i = [];
		for (let a = 0; a < e.length; a++) {
			let o = e[a], s = o[0] === "[", c = t.has(o);
			s || c ? (i.length > 0 && (i.sort(), n.push(...i), i = []), n.push(o)) : i.push(o);
		}
		return i.length > 0 && (i.sort(), n.push(...i)), n;
	};
}, createConfigUtils = (e) => ({
	cache: createLruCache(e.cacheSize),
	parseClassName: createParseClassName(e),
	sortModifiers: createSortModifiers(e),
	postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(e),
	...createClassGroupUtils(e)
}), createPostfixLookupClassGroupIds = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, SPLIT_CLASSES_REGEX = /\s+/, mergeClassList = (e, t) => {
	let { parseClassName: n, getClassGroupId: i, getConflictingClassGroupIds: a, sortModifiers: o, postfixLookupClassGroupIds: s } = t, c = [], l = e.trim().split(SPLIT_CLASSES_REGEX), u = "";
	for (let e = l.length - 1; e >= 0; --e) {
		let t = l[e], { isExternal: d, modifiers: f, hasImportantModifier: p, baseClassName: m, maybePostfixModifierPosition: h } = n(t);
		if (d) {
			u = t + (u.length > 0 ? " " + u : u);
			continue;
		}
		let g = !!h, _;
		if (g) {
			_ = i(m.substring(0, h));
			let e = _ && s[_] ? i(m) : void 0;
			e && e !== _ && (_ = e, g = !1);
		} else _ = i(m);
		if (!_) {
			if (!g) {
				u = t + (u.length > 0 ? " " + u : u);
				continue;
			}
			if (_ = i(m), !_) {
				u = t + (u.length > 0 ? " " + u : u);
				continue;
			}
			g = !1;
		}
		let v = f.length === 0 ? "" : f.length === 1 ? f[0] : o(f).join(":"), y = p ? v + IMPORTANT_MODIFIER : v, b = y + _;
		if (c.indexOf(b) > -1) continue;
		c.push(b);
		let x = a(_, g);
		for (let e = 0; e < x.length; ++e) {
			let t = x[e];
			c.push(y + t);
		}
		u = t + (u.length > 0 ? " " + u : u);
	}
	return u;
}, twJoin = (...e) => {
	let t = 0, n, i, a = "";
	for (; t < e.length;) (n = e[t++]) && (i = toValue(n)) && (a && (a += " "), a += i);
	return a;
}, toValue = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let i = 0; i < e.length; i++) e[i] && (t = toValue(e[i])) && (n && (n += " "), n += t);
	return n;
}, createTailwindMerge = (e, ...t) => {
	let n, i, a, o, s = (s) => (n = createConfigUtils(t.reduce((e, t) => t(e), e())), i = n.cache.get, a = n.cache.set, o = c, c(s)), c = (e) => {
		let t = i(e);
		if (t) return t;
		let o = mergeClassList(e, n);
		return a(e, o), o;
	};
	return o = s, (...e) => o(twJoin(...e));
}, fallbackThemeArr = [], fromTheme = (e) => {
	let t = (t) => t[e] || fallbackThemeArr;
	return t.isThemeGetter = !0, t;
}, arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i, fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, isFraction = (e) => fractionRegex.test(e), isNumber = (e) => !!e && !Number.isNaN(Number(e)), isInteger = (e) => !!e && Number.isInteger(Number(e)), isPercent = (e) => e.endsWith("%") && isNumber(e.slice(0, -1)), isTshirtSize = (e) => tshirtUnitRegex.test(e), isAny = () => !0, isLengthOnly = (e) => lengthUnitRegex.test(e) && !colorFunctionRegex.test(e), isNever = () => !1, isShadow = (e) => shadowRegex.test(e), isImage = (e) => imageRegex.test(e), isAnyNonArbitrary = (e) => !isArbitraryValue(e) && !isArbitraryVariable(e), isNamedContainerQuery = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), isArbitrarySize = (e) => getIsArbitraryValue(e, isLabelSize, isNever), isArbitraryValue = (e) => arbitraryValueRegex.test(e), isArbitraryLength = (e) => getIsArbitraryValue(e, isLabelLength, isLengthOnly), isArbitraryNumber = (e) => getIsArbitraryValue(e, isLabelNumber, isNumber), isArbitraryWeight = (e) => getIsArbitraryValue(e, isLabelWeight, isAny), isArbitraryFamilyName = (e) => getIsArbitraryValue(e, isLabelFamilyName, isNever), isArbitraryPosition = (e) => getIsArbitraryValue(e, isLabelPosition, isNever), isArbitraryImage = (e) => getIsArbitraryValue(e, isLabelImage, isImage), isArbitraryShadow = (e) => getIsArbitraryValue(e, isLabelShadow, isShadow), isArbitraryVariable = (e) => arbitraryVariableRegex.test(e), isArbitraryVariableLength = (e) => getIsArbitraryVariable(e, isLabelLength), isArbitraryVariableFamilyName = (e) => getIsArbitraryVariable(e, isLabelFamilyName), isArbitraryVariablePosition = (e) => getIsArbitraryVariable(e, isLabelPosition), isArbitraryVariableSize = (e) => getIsArbitraryVariable(e, isLabelSize), isArbitraryVariableImage = (e) => getIsArbitraryVariable(e, isLabelImage), isArbitraryVariableShadow = (e) => getIsArbitraryVariable(e, isLabelShadow, !0), isArbitraryVariableWeight = (e) => getIsArbitraryVariable(e, isLabelWeight, !0), getIsArbitraryValue = (e, t, n) => {
	let i = arbitraryValueRegex.exec(e);
	return i ? i[1] ? t(i[1]) : n(i[2]) : !1;
}, getIsArbitraryVariable = (e, t, n = !1) => {
	let i = arbitraryVariableRegex.exec(e);
	return i ? i[1] ? t(i[1]) : n : !1;
}, isLabelPosition = (e) => e === "position" || e === "percentage", isLabelImage = (e) => e === "image" || e === "url", isLabelSize = (e) => e === "length" || e === "size" || e === "bg-size", isLabelLength = (e) => e === "length", isLabelNumber = (e) => e === "number", isLabelFamilyName = (e) => e === "family-name", isLabelWeight = (e) => e === "number" || e === "weight", isLabelShadow = (e) => e === "shadow", twMerge = /* @__PURE__ */ createTailwindMerge(() => {
	let e = fromTheme("color"), t = fromTheme("font"), n = fromTheme("text"), i = fromTheme("font-weight"), a = fromTheme("tracking"), o = fromTheme("leading"), s = fromTheme("breakpoint"), c = fromTheme("container"), l = fromTheme("spacing"), u = fromTheme("radius"), d = fromTheme("shadow"), f = fromTheme("inset-shadow"), p = fromTheme("text-shadow"), m = fromTheme("drop-shadow"), h = fromTheme("blur"), g = fromTheme("perspective"), _ = fromTheme("aspect"), v = fromTheme("ease"), y = fromTheme("animate"), b = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], x = () => [
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
	], S = () => [
		...x(),
		isArbitraryVariable,
		isArbitraryValue
	], C = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], w = () => [
		"auto",
		"contain",
		"none"
	], T = () => [
		isArbitraryVariable,
		isArbitraryValue,
		l
	], E = () => [
		isFraction,
		"full",
		"auto",
		...T()
	], D = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	], O = () => [
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
	], k = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	], A = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	], j = () => [
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
	], M = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], N = () => ["auto", ...T()], P = () => [
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
		...T()
	], F = () => [
		isFraction,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...T()
	], I = () => [
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
		...T()
	], L = () => [
		e,
		isArbitraryVariable,
		isArbitraryValue
	], R = () => [
		...x(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	], z = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], B = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	], V = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	], H = () => [
		"",
		"none",
		"full",
		u,
		isArbitraryVariable,
		isArbitraryValue
	], U = () => [
		"",
		isNumber,
		isArbitraryVariableLength,
		isArbitraryLength
	], W = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], G = () => [
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
	], K = () => [
		isNumber,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	], q = () => [
		"",
		"none",
		h,
		isArbitraryVariable,
		isArbitraryValue
	], J = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	], Y = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	], Z = () => [
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	], Q = () => [
		isFraction,
		"full",
		...T()
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
				_
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
				c
			] }],
			"break-after": [{ "break-after": b() }],
			"break-before": [{ "break-before": b() }],
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
			"object-position": [{ object: S() }],
			overflow: [{ overflow: C() }],
			"overflow-x": [{ "overflow-x": C() }],
			"overflow-y": [{ "overflow-y": C() }],
			overscroll: [{ overscroll: w() }],
			"overscroll-x": [{ "overscroll-x": w() }],
			"overscroll-y": [{ "overscroll-y": w() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: E() }],
			"inset-x": [{ "inset-x": E() }],
			"inset-y": [{ "inset-y": E() }],
			start: [{
				"inset-s": E(),
				start: E()
			}],
			end: [{
				"inset-e": E(),
				end: E()
			}],
			"inset-bs": [{ "inset-bs": E() }],
			"inset-be": [{ "inset-be": E() }],
			top: [{ top: E() }],
			right: [{ right: E() }],
			bottom: [{ bottom: E() }],
			left: [{ left: E() }],
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
				c,
				...T()
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
			"grid-cols": [{ "grid-cols": D() }],
			"col-start-end": [{ col: O() }],
			"col-start": [{ "col-start": k() }],
			"col-end": [{ "col-end": k() }],
			"grid-rows": [{ "grid-rows": D() }],
			"row-start-end": [{ row: O() }],
			"row-start": [{ "row-start": k() }],
			"row-end": [{ "row-end": k() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": A() }],
			"auto-rows": [{ "auto-rows": A() }],
			gap: [{ gap: T() }],
			"gap-x": [{ "gap-x": T() }],
			"gap-y": [{ "gap-y": T() }],
			"justify-content": [{ justify: [...j(), "normal"] }],
			"justify-items": [{ "justify-items": [...M(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...M()] }],
			"align-content": [{ content: ["normal", ...j()] }],
			"align-items": [{ items: [...M(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...M(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": j() }],
			"place-items": [{ "place-items": [...M(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...M()] }],
			p: [{ p: T() }],
			px: [{ px: T() }],
			py: [{ py: T() }],
			ps: [{ ps: T() }],
			pe: [{ pe: T() }],
			pbs: [{ pbs: T() }],
			pbe: [{ pbe: T() }],
			pt: [{ pt: T() }],
			pr: [{ pr: T() }],
			pb: [{ pb: T() }],
			pl: [{ pl: T() }],
			m: [{ m: N() }],
			mx: [{ mx: N() }],
			my: [{ my: N() }],
			ms: [{ ms: N() }],
			me: [{ me: N() }],
			mbs: [{ mbs: N() }],
			mbe: [{ mbe: N() }],
			mt: [{ mt: N() }],
			mr: [{ mr: N() }],
			mb: [{ mb: N() }],
			ml: [{ ml: N() }],
			"space-x": [{ "space-x": T() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": T() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: P() }],
			"inline-size": [{ inline: ["auto", ...F()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...F()] }],
			"max-inline-size": [{ "max-inline": ["none", ...F()] }],
			"block-size": [{ block: ["auto", ...I()] }],
			"min-block-size": [{ "min-block": ["auto", ...I()] }],
			"max-block-size": [{ "max-block": ["none", ...I()] }],
			w: [{ w: [
				c,
				"screen",
				...P()
			] }],
			"min-w": [{ "min-w": [
				c,
				"screen",
				"none",
				...P()
			] }],
			"max-w": [{ "max-w": [
				c,
				"screen",
				"none",
				"prose",
				{ screen: [s] },
				...P()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...P()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...P()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...P()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				i,
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
				t
			] }],
			"font-features": [{ "font-features": [isArbitraryValue] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				a,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"line-clamp": [{ "line-clamp": [
				isNumber,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			leading: [{ leading: [o, ...T()] }],
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
			"placeholder-color": [{ placeholder: L() }],
			"text-color": [{ text: L() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...W(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				isNumber,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			"text-decoration-color": [{ decoration: L() }],
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
			indent: [{ indent: T() }],
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
			"bg-position": [{ bg: R() }],
			"bg-repeat": [{ bg: z() }],
			"bg-size": [{ bg: B() }],
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
			"bg-color": [{ bg: L() }],
			"gradient-from-pos": [{ from: V() }],
			"gradient-via-pos": [{ via: V() }],
			"gradient-to-pos": [{ to: V() }],
			"gradient-from": [{ from: L() }],
			"gradient-via": [{ via: L() }],
			"gradient-to": [{ to: L() }],
			rounded: [{ rounded: H() }],
			"rounded-s": [{ "rounded-s": H() }],
			"rounded-e": [{ "rounded-e": H() }],
			"rounded-t": [{ "rounded-t": H() }],
			"rounded-r": [{ "rounded-r": H() }],
			"rounded-b": [{ "rounded-b": H() }],
			"rounded-l": [{ "rounded-l": H() }],
			"rounded-ss": [{ "rounded-ss": H() }],
			"rounded-se": [{ "rounded-se": H() }],
			"rounded-ee": [{ "rounded-ee": H() }],
			"rounded-es": [{ "rounded-es": H() }],
			"rounded-tl": [{ "rounded-tl": H() }],
			"rounded-tr": [{ "rounded-tr": H() }],
			"rounded-br": [{ "rounded-br": H() }],
			"rounded-bl": [{ "rounded-bl": H() }],
			"border-w": [{ border: U() }],
			"border-w-x": [{ "border-x": U() }],
			"border-w-y": [{ "border-y": U() }],
			"border-w-s": [{ "border-s": U() }],
			"border-w-e": [{ "border-e": U() }],
			"border-w-bs": [{ "border-bs": U() }],
			"border-w-be": [{ "border-be": U() }],
			"border-w-t": [{ "border-t": U() }],
			"border-w-r": [{ "border-r": U() }],
			"border-w-b": [{ "border-b": U() }],
			"border-w-l": [{ "border-l": U() }],
			"divide-x": [{ "divide-x": U() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": U() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...W(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...W(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: L() }],
			"border-color-x": [{ "border-x": L() }],
			"border-color-y": [{ "border-y": L() }],
			"border-color-s": [{ "border-s": L() }],
			"border-color-e": [{ "border-e": L() }],
			"border-color-bs": [{ "border-bs": L() }],
			"border-color-be": [{ "border-be": L() }],
			"border-color-t": [{ "border-t": L() }],
			"border-color-r": [{ "border-r": L() }],
			"border-color-b": [{ "border-b": L() }],
			"border-color-l": [{ "border-l": L() }],
			"divide-color": [{ divide: L() }],
			"outline-style": [{ outline: [
				...W(),
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
			"outline-color": [{ outline: L() }],
			shadow: [{ shadow: [
				"",
				"none",
				d,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"shadow-color": [{ shadow: L() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				f,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"inset-shadow-color": [{ "inset-shadow": L() }],
			"ring-w": [{ ring: U() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: L() }],
			"ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
			"ring-offset-color": [{ "ring-offset": L() }],
			"inset-ring-w": [{ "inset-ring": U() }],
			"inset-ring-color": [{ "inset-ring": L() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				p,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"text-shadow-color": [{ "text-shadow": L() }],
			opacity: [{ opacity: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"mix-blend": [{ "mix-blend": [
				...G(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": G() }],
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
			"mask-image-linear-from-pos": [{ "mask-linear-from": K() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": K() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": L() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": L() }],
			"mask-image-t-from-pos": [{ "mask-t-from": K() }],
			"mask-image-t-to-pos": [{ "mask-t-to": K() }],
			"mask-image-t-from-color": [{ "mask-t-from": L() }],
			"mask-image-t-to-color": [{ "mask-t-to": L() }],
			"mask-image-r-from-pos": [{ "mask-r-from": K() }],
			"mask-image-r-to-pos": [{ "mask-r-to": K() }],
			"mask-image-r-from-color": [{ "mask-r-from": L() }],
			"mask-image-r-to-color": [{ "mask-r-to": L() }],
			"mask-image-b-from-pos": [{ "mask-b-from": K() }],
			"mask-image-b-to-pos": [{ "mask-b-to": K() }],
			"mask-image-b-from-color": [{ "mask-b-from": L() }],
			"mask-image-b-to-color": [{ "mask-b-to": L() }],
			"mask-image-l-from-pos": [{ "mask-l-from": K() }],
			"mask-image-l-to-pos": [{ "mask-l-to": K() }],
			"mask-image-l-from-color": [{ "mask-l-from": L() }],
			"mask-image-l-to-color": [{ "mask-l-to": L() }],
			"mask-image-x-from-pos": [{ "mask-x-from": K() }],
			"mask-image-x-to-pos": [{ "mask-x-to": K() }],
			"mask-image-x-from-color": [{ "mask-x-from": L() }],
			"mask-image-x-to-color": [{ "mask-x-to": L() }],
			"mask-image-y-from-pos": [{ "mask-y-from": K() }],
			"mask-image-y-to-pos": [{ "mask-y-to": K() }],
			"mask-image-y-from-color": [{ "mask-y-from": L() }],
			"mask-image-y-to-color": [{ "mask-y-to": L() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": K() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": K() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": L() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": L() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": x() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": K() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": K() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": L() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": L() }],
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
			"mask-position": [{ mask: R() }],
			"mask-repeat": [{ mask: z() }],
			"mask-size": [{ mask: B() }],
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
			blur: [{ blur: q() }],
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
				m,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"drop-shadow-color": [{ "drop-shadow": L() }],
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
			"backdrop-blur": [{ "backdrop-blur": q() }],
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
			"border-spacing": [{ "border-spacing": T() }],
			"border-spacing-x": [{ "border-spacing-x": T() }],
			"border-spacing-y": [{ "border-spacing-y": T() }],
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
				v,
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
				y,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				g,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"perspective-origin": [{ "perspective-origin": S() }],
			rotate: [{ rotate: J() }],
			"rotate-x": [{ "rotate-x": J() }],
			"rotate-y": [{ "rotate-y": J() }],
			"rotate-z": [{ "rotate-z": J() }],
			scale: [{ scale: Y() }],
			"scale-x": [{ "scale-x": Y() }],
			"scale-y": [{ "scale-y": Y() }],
			"scale-z": [{ "scale-z": Y() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: Z() }],
			"skew-x": [{ "skew-x": Z() }],
			"skew-y": [{ "skew-y": Z() }],
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: S() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: Q() }],
			"translate-x": [{ "translate-x": Q() }],
			"translate-y": [{ "translate-y": Q() }],
			"translate-z": [{ "translate-z": Q() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			accent: [{ accent: L() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: L() }],
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
			"scrollbar-thumb-color": [{ "scrollbar-thumb": L() }],
			"scrollbar-track-color": [{ "scrollbar-track": L() }],
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
			"scroll-m": [{ "scroll-m": T() }],
			"scroll-mx": [{ "scroll-mx": T() }],
			"scroll-my": [{ "scroll-my": T() }],
			"scroll-ms": [{ "scroll-ms": T() }],
			"scroll-me": [{ "scroll-me": T() }],
			"scroll-mbs": [{ "scroll-mbs": T() }],
			"scroll-mbe": [{ "scroll-mbe": T() }],
			"scroll-mt": [{ "scroll-mt": T() }],
			"scroll-mr": [{ "scroll-mr": T() }],
			"scroll-mb": [{ "scroll-mb": T() }],
			"scroll-ml": [{ "scroll-ml": T() }],
			"scroll-p": [{ "scroll-p": T() }],
			"scroll-px": [{ "scroll-px": T() }],
			"scroll-py": [{ "scroll-py": T() }],
			"scroll-ps": [{ "scroll-ps": T() }],
			"scroll-pe": [{ "scroll-pe": T() }],
			"scroll-pbs": [{ "scroll-pbs": T() }],
			"scroll-pbe": [{ "scroll-pbe": T() }],
			"scroll-pt": [{ "scroll-pt": T() }],
			"scroll-pr": [{ "scroll-pr": T() }],
			"scroll-pb": [{ "scroll-pb": T() }],
			"scroll-pl": [{ "scroll-pl": T() }],
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
			fill: [{ fill: ["none", ...L()] }],
			"stroke-w": [{ stroke: [
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			stroke: [{ stroke: ["none", ...L()] }],
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
const cx = clsx, cva = (e, t) => (n) => {
	if (t?.variants == null) return cx(e, n?.class, n?.className);
	let { variants: i, defaultVariants: a } = t, o = Object.keys(i).map((e) => {
		let t = n?.[e], o = a?.[e];
		if (t === null) return null;
		let s = falsyToString(t) || falsyToString(o);
		return i[e][s];
	}), s = n && Object.entries(n).reduce((e, t) => {
		let [n, i] = t;
		return i === void 0 || (e[n] = i), e;
	}, {});
	return cx(e, o, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: i, ...o } = t;
		return Object.entries(o).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...a,
				...s
			}[t]) : {
				...a,
				...s
			}[t] === n;
		}) ? [
			...e,
			n,
			i
		] : e;
	}, []), n?.class, n?.className);
}, buttonVariants = cva([
	"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium",
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
		},
		rounded: {
			sm: "rounded-sm",
			md: "rounded-md",
			lg: "rounded-lg",
			full: "rounded-full"
		}
	},
	compoundVariants: [{
		size: "icon",
		variant: "accent",
		class: "rounded-md active:scale-[0.98]"
	}],
	defaultVariants: {
		variant: "flat",
		size: "default",
		rounded: "md"
	}
});
var Button = React$1.forwardRef(({ variant: e, size: t, rounded: n, asChild: i = !1, type: a = "button", ...o }, s) => /* @__PURE__ */ jsx(i ? Slot$3 : "button", {
	ref: s,
	type: i ? void 0 : a,
	"data-variant": e,
	"data-size": t,
	className: buttonVariants({
		variant: e,
		size: t,
		rounded: n
	}),
	...o
}));
Button.displayName = "Button";
var ButtonLink = React$1.forwardRef(({ variant: e, rounded: t, size: n, external: i, href: a, target: o, rel: s, "aria-disabled": c, ...l }, u) => {
	let d = i ?? (typeof a == "string" && /^https?:\/\//.test(a)), f = c === !0 || c === "true";
	return /* @__PURE__ */ jsx("a", {
		ref: u,
		href: f ? void 0 : a,
		target: d ? "_blank" : o,
		rel: d ? [
			s,
			"noopener",
			"noreferrer"
		].filter(Boolean).join(" ") : s,
		"aria-disabled": c,
		tabIndex: f ? -1 : l.tabIndex,
		"data-variant": e,
		"data-size": n,
		className: cn(buttonVariants({
			variant: e,
			size: n,
			rounded: t
		}), f && "pointer-events-none opacity-50"),
		onClick: f ? (e) => {
			e.preventDefault(), l.onClick?.(e);
		} : l.onClick,
		...l
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
function Card({ variant: e, size: t, ...n }) {
	return /* @__PURE__ */ jsx("div", {
		"data-variant": e,
		"data-size": t,
		className: cardVariants({
			variant: e,
			size: t
		}),
		...n
	});
}
function CardHeader({ action: e, children: t, ...n }) {
	return e ? /* @__PURE__ */ jsx("div", {
		className: cardSectionX,
		...n,
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex min-w-0 flex-col gap-1",
				children: t
			}), /* @__PURE__ */ jsx("div", {
				className: "self-start justify-self-end",
				children: e
			})]
		})
	}) : /* @__PURE__ */ jsx("div", {
		className: `flex flex-col gap-1 ${cardSectionX}`,
		...n,
		children: t
	});
}
function CardTitle({ as: e = "h3", ...t }) {
	return /* @__PURE__ */ jsx(e, {
		className: "text-base font-medium leading-snug text-text-primary group-data-[size=sm]/card:text-sm",
		...t
	});
}
function CardDescription(e) {
	return /* @__PURE__ */ jsx("p", {
		className: "text-sm text-text-muted",
		...e
	});
}
function CardContent(e) {
	return /* @__PURE__ */ jsx("div", {
		className: cardSectionX,
		...e
	});
}
function CardFooter({ align: e = "start", ...t }) {
	return /* @__PURE__ */ jsx("div", {
		className: `flex flex-wrap items-center gap-3 ${cardSectionX} ${cardFooterAlign[e]}`,
		...t
	});
}
function CardMedia(e) {
	return /* @__PURE__ */ jsx("div", {
		className: "-mt-6 w-full overflow-hidden group-data-[size=sm]/card:-mt-4 [&_img]:block [&_img]:size-full [&_img]:object-cover rounded-t-lg",
		...e
	});
}
/**
* @license lucide-react v1.16.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), toKebabCase = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), toCamelCase = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), toPascalCase = (e) => {
	let t = toCamelCase(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
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
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, LucideContext = createContext({}), useLucideContext = () => useContext(LucideContext), Icon$1 = forwardRef(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: a, className: o = "", children: s, iconNode: c, ...l }, u) => {
	let { size: d = 24, strokeWidth: f = 2, absoluteStrokeWidth: p = !1, color: m = "currentColor", className: h = "" } = useLucideContext() ?? {}, g = a ?? p ? Number(n ?? f) * 24 / Number(t ?? d) : n ?? f;
	return createElement("svg", {
		ref: u,
		...defaultAttributes,
		width: t ?? d ?? defaultAttributes.width,
		height: t ?? d ?? defaultAttributes.height,
		stroke: e ?? m,
		strokeWidth: g,
		className: mergeClasses("lucide", h, o),
		...!s && !hasA11yProp(l) && { "aria-hidden": "true" },
		...l
	}, [...c.map(([e, t]) => createElement(e, t)), ...Array.isArray(s) ? s : [s]]);
}), createLucideIcon = (e, t) => {
	let n = forwardRef(({ className: n, ...a }, o) => createElement(Icon$1, {
		ref: o,
		iconNode: t,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(e))}`, `lucide-${e}`, n),
		...a
	}));
	return n.displayName = toPascalCase(e), n;
}, Calendar = createLucideIcon("calendar", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}]
]), Check = createLucideIcon("check", [["path", {
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
	"flex h-9 w-full min-w-0 items-center gap-2 px-3 text-sm text-text-primary",
	"focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-surface",
	"has-disabled:cursor-not-allowed has-disabled:opacity-50",
	"transition-[box-shadow,border-color,background-color,color] duration-200 ease-out motion-reduce:transition-none"
], {
	variants: {
		variant: {
			border: "border border-border bg-surface-elevated hover:border-border-strong focus-within:border-border-strong focus-within:ring-ring/40",
			inset: "border border-transparent bg-surface shadow-[var(--shadow-button-inset)] focus-within:shadow-[var(--shadow-button-raised-hover)] focus-within:ring-ring/40",
			raised: [
				"border border-transparent bg-surface shadow-[var(--shadow-button-raised)]",
				"[background:var(--background-gradient-raised)]",
				"focus-within:shadow-[var(--shadow-button-raised-hover)] focus-within:ring-ring/40"
			],
			filled: "border border-transparent bg-surface text-text-primary hover:bg-surface-elevated focus-within:ring-ring/40"
		},
		invalid: {
			true: "",
			false: ""
		},
		rounded: {
			sm: "rounded-sm",
			md: "rounded-md",
			lg: "rounded-lg",
			full: "rounded-full"
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
		invalid: !1,
		rounded: "md"
	}
});
var Input = React$1.forwardRef(({ variant: e, rounded: t, mode: n = "default", showPasswordToggle: i = !1, errorMessage: a, type: o = "text", id: s, ...c }, u) => {
	let d = useId(), f = s ?? d, m = `${f}-error`, _ = !!a, v = n === "search", y = o === "password", [b, x] = useState(!1), S = y && i, C = S && b ? "text" : o ?? "text";
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full flex-col gap-1.5",
		children: [/* @__PURE__ */ jsxs("div", {
			"data-variant": e,
			"data-mode": n,
			"data-invalid": _ || void 0,
			className: fieldVariants({
				variant: e,
				invalid: _,
				rounded: t
			}),
			children: [
				v ? /* @__PURE__ */ jsx(Search, {
					className: "size-4 shrink-0 text-text-muted",
					"aria-hidden": !0
				}) : null,
				/* @__PURE__ */ jsx("input", {
					ref: u,
					id: f,
					type: C,
					"aria-invalid": _ || void 0,
					"aria-describedby": _ ? m : void 0,
					className: cn("w-full bg-transparent text-sm text-text-primary placeholder:text-text-subtle", "outline-none disabled:cursor-not-allowed", S ? "pr-1" : ""),
					...c
				}),
				S ? /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "inline-flex size-5 shrink-0 items-center justify-center text-text-muted hover:text-text-primary",
					onClick: () => x((e) => !e),
					"aria-label": b ? "Hide password" : "Show password",
					children: jsx(b ? EyeOff : Eye, {
						className: "size-4",
						"aria-hidden": !0
					})
				}) : null
			]
		}), a ? /* @__PURE__ */ jsx("p", {
			id: m,
			role: "alert",
			className: "text-xs text-error",
			children: a
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
var Label = React$1.forwardRef(({ size: e, children: t, htmlFor: n, required: i = !1, ...a }, o) => /* @__PURE__ */ jsxs("label", {
	ref: o,
	htmlFor: n,
	className: labelVariants({ size: e }),
	...a,
	children: [/* @__PURE__ */ jsx("span", { children: t }), i ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("span", {
		className: "text-error",
		"aria-hidden": !0,
		children: "*"
	}) }) : null]
}));
Label.displayName = "Label", typeof window < "u" && window.document && window.document.createElement;
function composeEventHandlers$1(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(i) {
		if (e?.(i), n === !1 || !i.defaultPrevented) return t?.(i);
	};
}
function createContext2(t, n) {
	let i = React$1.createContext(n), a = (t) => {
		let { children: n, ...a } = t, o = React$1.useMemo(() => a, Object.values(a));
		return /* @__PURE__ */ jsx(i.Provider, {
			value: o,
			children: n
		});
	};
	a.displayName = t + "Provider";
	function o(a) {
		let o = React$1.useContext(i);
		if (o) return o;
		if (n !== void 0) return n;
		throw Error(`\`${a}\` must be used within \`${t}\``);
	}
	return [a, o];
}
function createContextScope$1(t, n = []) {
	let i = [];
	function a(n, a) {
		let o = React$1.createContext(a), s = i.length;
		i = [...i, a];
		let c = (n) => {
			let { scope: i, children: a, ...c } = n, l = i?.[t]?.[s] || o, u = React$1.useMemo(() => c, Object.values(c));
			return /* @__PURE__ */ jsx(l.Provider, {
				value: u,
				children: a
			});
		};
		c.displayName = n + "Provider";
		function l(i, c) {
			let l = c?.[t]?.[s] || o, u = React$1.useContext(l);
			if (u) return u;
			if (a !== void 0) return a;
			throw Error(`\`${i}\` must be used within \`${n}\``);
		}
		return [c, l];
	}
	let o = () => {
		let n = i.map((t) => React$1.createContext(t));
		return function(i) {
			let a = i?.[t] || n;
			return React$1.useMemo(() => ({ [`__scope${t}`]: {
				...i,
				[t]: a
			} }), [i, a]);
		};
	};
	return o.scopeName = t, [a, composeContextScopes$1(o, ...n)];
}
function composeContextScopes$1(...t) {
	let n = t[0];
	if (t.length === 1) return n;
	let i = () => {
		let i = t.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(t) {
			let a = i.reduce((e, { useScope: n, scopeName: i }) => {
				let a = n(t)[`__scope${i}`];
				return {
					...e,
					...a
				};
			}, {});
			return React$1.useMemo(() => ({ [`__scope${n.scopeName}`]: a }), [a]);
		};
	};
	return i.scopeName = n.scopeName, i;
}
var useLayoutEffect2$1 = globalThis?.document ? React$1.useLayoutEffect : () => {}, useReactId$1 = React$1.useId || (() => void 0), count$3 = 0;
function useId$2(t) {
	let [n, i] = React$1.useState(useReactId$1());
	return useLayoutEffect2$1(() => {
		t || i((e) => e ?? String(count$3++));
	}, [t]), t || (n ? `radix-${n}` : "");
}
var useInsertionEffect$1 = React$1.useInsertionEffect || useLayoutEffect2$1;
function useControllableState$1({ prop: t, defaultProp: n, onChange: i = () => {}, caller: a }) {
	let [o, s, c] = useUncontrolledState$1({
		defaultProp: n,
		onChange: i
	}), l = t !== void 0, u = l ? t : o;
	{
		let n = React$1.useRef(t !== void 0);
		React$1.useEffect(() => {
			let e = n.current;
			if (e !== l) {
				let t = e ? "controlled" : "uncontrolled", n = l ? "controlled" : "uncontrolled";
				console.warn(`${a} is changing from ${t} to ${n}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
			}
			n.current = l;
		}, [l, a]);
	}
	return [u, React$1.useCallback((e) => {
		if (l) {
			let n = isFunction$1(e) ? e(t) : e;
			n !== t && c.current?.(n);
		} else s(e);
	}, [
		l,
		t,
		s,
		c
	])];
}
function useUncontrolledState$1({ defaultProp: t, onChange: n }) {
	let [i, a] = React$1.useState(t), o = React$1.useRef(i), s = React$1.useRef(n);
	return useInsertionEffect$1(() => {
		s.current = n;
	}, [n]), React$1.useEffect(() => {
		o.current !== i && (s.current?.(i), o.current = i);
	}, [i, o]), [
		i,
		a,
		s
	];
}
function isFunction$1(e) {
	return typeof e == "function";
}
/* @__NO_SIDE_EFFECTS__ */
function createSlot$1(t) {
	let n = /* @__PURE__ */ createSlotClone(t), i = React$1.forwardRef((t, i) => {
		let { children: a, ...o } = t, s = React$1.Children.toArray(a), c = s.find(isSlottable$1);
		if (c) {
			let t = c.props.children, a = s.map((n) => n === c ? React$1.Children.count(t) > 1 ? React$1.Children.only(null) : React$1.isValidElement(t) ? t.props.children : null : n);
			return /* @__PURE__ */ jsx(n, {
				...o,
				ref: i,
				children: React$1.isValidElement(t) ? React$1.cloneElement(t, void 0, a) : null
			});
		}
		return /* @__PURE__ */ jsx(n, {
			...o,
			ref: i,
			children: a
		});
	});
	return i.displayName = `${t}.Slot`, i;
}
/* @__NO_SIDE_EFFECTS__ */
function createSlotClone(t) {
	let n = React$1.forwardRef((t, n) => {
		let { children: i, ...a } = t;
		if (React$1.isValidElement(i)) {
			let t = getElementRef$3(i), o = mergeProps$1(a, i.props);
			return i.type !== React$1.Fragment && (o.ref = n ? composeRefs$1(n, t) : t), React$1.cloneElement(i, o);
		}
		return React$1.Children.count(i) > 1 ? React$1.Children.only(null) : null;
	});
	return n.displayName = `${t}.SlotClone`, n;
}
var SLOTTABLE_IDENTIFIER$1 = Symbol("radix.slottable");
function isSlottable$1(t) {
	return React$1.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === SLOTTABLE_IDENTIFIER$1;
}
function mergeProps$1(e, t) {
	let n = { ...t };
	for (let i in t) {
		let a = e[i], o = t[i];
		/^on[A-Z]/.test(i) ? a && o ? n[i] = (...e) => {
			let t = o(...e);
			return a(...e), t;
		} : a && (n[i] = a) : i === "style" ? n[i] = {
			...a,
			...o
		} : i === "className" && (n[i] = [a, o].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function getElementRef$3(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Primitive$1 = [
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
].reduce((t, n) => {
	let i = /* @__PURE__ */ createSlot$1(`Primitive.${n}`), a = React$1.forwardRef((e, t) => {
		let { asChild: a, ...o } = e, s = a ? i : n;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ jsx(s, {
			...o,
			ref: t
		});
	});
	return a.displayName = `Primitive.${n}`, {
		...t,
		[n]: a
	};
}, {});
function dispatchDiscreteCustomEvent$1(e, t) {
	e && ReactDOM$1.flushSync(() => e.dispatchEvent(t));
}
function useCallbackRef$1(t) {
	let n = React$1.useRef(t);
	return React$1.useEffect(() => {
		n.current = t;
	}), React$1.useMemo(() => (...e) => n.current?.(...e), []);
}
function useEscapeKeydown(t, n = globalThis?.document) {
	let i = useCallbackRef$1(t);
	React$1.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && i(e);
		};
		return n.addEventListener("keydown", e, { capture: !0 }), () => n.removeEventListener("keydown", e, { capture: !0 });
	}, [i, n]);
}
var DISMISSABLE_LAYER_NAME$1 = "DismissableLayer", CONTEXT_UPDATE$1 = "dismissableLayer.update", POINTER_DOWN_OUTSIDE$1 = "dismissableLayer.pointerDownOutside", FOCUS_OUTSIDE$1 = "dismissableLayer.focusOutside", originalBodyPointerEvents$1, DismissableLayerContext$1 = React$1.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
}), DismissableLayer$1 = React$1.forwardRef((t, n) => {
	let { disableOutsidePointerEvents: i = !1, onEscapeKeyDown: a, onPointerDownOutside: o, onFocusOutside: s, onInteractOutside: c, onDismiss: l, ...u } = t, d = React$1.useContext(DismissableLayerContext$1), [f, p] = React$1.useState(null), m = f?.ownerDocument ?? globalThis?.document, [, g] = React$1.useState({}), _ = useComposedRefs$1(n, (e) => p(e)), v = Array.from(d.layers), [y] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), b = v.indexOf(y), x = f ? v.indexOf(f) : -1, S = d.layersWithOutsidePointerEventsDisabled.size > 0, w = x >= b, T = usePointerDownOutside$1((e) => {
		let t = e.target, n = [...d.branches].some((e) => e.contains(t));
		!w || n || (o?.(e), c?.(e), e.defaultPrevented || l?.());
	}, m), E = useFocusOutside$1((e) => {
		let t = e.target;
		[...d.branches].some((e) => e.contains(t)) || (s?.(e), c?.(e), e.defaultPrevented || l?.());
	}, m);
	return useEscapeKeydown((e) => {
		x === d.layers.size - 1 && (a?.(e), !e.defaultPrevented && l && (e.preventDefault(), l()));
	}, m), React$1.useEffect(() => {
		if (f) return i && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (originalBodyPointerEvents$1 = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(f)), d.layers.add(f), dispatchUpdate$1(), () => {
			i && d.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = originalBodyPointerEvents$1);
		};
	}, [
		f,
		m,
		i,
		d
	]), React$1.useEffect(() => () => {
		f && (d.layers.delete(f), d.layersWithOutsidePointerEventsDisabled.delete(f), dispatchUpdate$1());
	}, [f, d]), React$1.useEffect(() => {
		let e = () => g({});
		return document.addEventListener(CONTEXT_UPDATE$1, e), () => document.removeEventListener(CONTEXT_UPDATE$1, e);
	}, []), /* @__PURE__ */ jsx(Primitive$1.div, {
		...u,
		ref: _,
		style: {
			pointerEvents: S ? w ? "auto" : "none" : void 0,
			...t.style
		},
		onFocusCapture: composeEventHandlers$1(t.onFocusCapture, E.onFocusCapture),
		onBlurCapture: composeEventHandlers$1(t.onBlurCapture, E.onBlurCapture),
		onPointerDownCapture: composeEventHandlers$1(t.onPointerDownCapture, T.onPointerDownCapture)
	});
});
DismissableLayer$1.displayName = DISMISSABLE_LAYER_NAME$1;
var BRANCH_NAME$1 = "DismissableLayerBranch", DismissableLayerBranch$1 = React$1.forwardRef((t, n) => {
	let i = React$1.useContext(DismissableLayerContext$1), a = React$1.useRef(null), o = useComposedRefs$1(n, a);
	return React$1.useEffect(() => {
		let e = a.current;
		if (e) return i.branches.add(e), () => {
			i.branches.delete(e);
		};
	}, [i.branches]), /* @__PURE__ */ jsx(Primitive$1.div, {
		...t,
		ref: o
	});
});
DismissableLayerBranch$1.displayName = BRANCH_NAME$1;
function usePointerDownOutside$1(t, n = globalThis?.document) {
	let i = useCallbackRef$1(t), a = React$1.useRef(!1), o = React$1.useRef(() => {});
	return React$1.useEffect(() => {
		let e = (e) => {
			if (e.target && !a.current) {
				let t = function() {
					handleAndDispatchCustomEvent$1(POINTER_DOWN_OUTSIDE$1, i, a, { discrete: !0 });
				}, a = { originalEvent: e };
				e.pointerType === "touch" ? (n.removeEventListener("click", o.current), o.current = t, n.addEventListener("click", o.current, { once: !0 })) : t();
			} else n.removeEventListener("click", o.current);
			a.current = !1;
		}, t = window.setTimeout(() => {
			n.addEventListener("pointerdown", e);
		}, 0);
		return () => {
			window.clearTimeout(t), n.removeEventListener("pointerdown", e), n.removeEventListener("click", o.current);
		};
	}, [n, i]), { onPointerDownCapture: () => a.current = !0 };
}
function useFocusOutside$1(t, n = globalThis?.document) {
	let i = useCallbackRef$1(t), a = React$1.useRef(!1);
	return React$1.useEffect(() => {
		let e = (e) => {
			e.target && !a.current && handleAndDispatchCustomEvent$1(FOCUS_OUTSIDE$1, i, { originalEvent: e }, { discrete: !1 });
		};
		return n.addEventListener("focusin", e), () => n.removeEventListener("focusin", e);
	}, [n, i]), {
		onFocusCapture: () => a.current = !0,
		onBlurCapture: () => a.current = !1
	};
}
function dispatchUpdate$1() {
	let e = new CustomEvent(CONTEXT_UPDATE$1);
	document.dispatchEvent(e);
}
function handleAndDispatchCustomEvent$1(e, t, n, { discrete: i }) {
	let a = n.originalEvent.target, o = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && a.addEventListener(e, t, { once: !0 }), i ? dispatchDiscreteCustomEvent$1(a, o) : a.dispatchEvent(o);
}
var AUTOFOCUS_ON_MOUNT$1 = "focusScope.autoFocusOnMount", AUTOFOCUS_ON_UNMOUNT$1 = "focusScope.autoFocusOnUnmount", EVENT_OPTIONS$1 = {
	bubbles: !1,
	cancelable: !0
}, FOCUS_SCOPE_NAME$1 = "FocusScope", FocusScope$1 = React$1.forwardRef((t, n) => {
	let { loop: i = !1, trapped: a = !1, onMountAutoFocus: o, onUnmountAutoFocus: s, ...c } = t, [l, u] = React$1.useState(null), d = useCallbackRef$1(o), f = useCallbackRef$1(s), p = React$1.useRef(null), m = useComposedRefs$1(n, (e) => u(e)), g = React$1.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	React$1.useEffect(() => {
		if (a) {
			let e = function(e) {
				if (g.paused || !l) return;
				let t = e.target;
				l.contains(t) ? p.current = t : focus$1(p.current, { select: !0 });
			}, t = function(e) {
				if (g.paused || !l) return;
				let t = e.relatedTarget;
				t !== null && (l.contains(t) || focus$1(p.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && focus$1(l);
			};
			document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let i = new MutationObserver(n);
			return l && i.observe(l, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), i.disconnect();
			};
		}
	}, [
		a,
		l,
		g.paused
	]), React$1.useEffect(() => {
		if (l) {
			focusScopesStack$1.add(g);
			let e = document.activeElement;
			if (!l.contains(e)) {
				let t = new CustomEvent(AUTOFOCUS_ON_MOUNT$1, EVENT_OPTIONS$1);
				l.addEventListener(AUTOFOCUS_ON_MOUNT$1, d), l.dispatchEvent(t), t.defaultPrevented || (focusFirst$1(removeLinks$1(getTabbableCandidates$1(l)), { select: !0 }), document.activeElement === e && focus$1(l));
			}
			return () => {
				l.removeEventListener(AUTOFOCUS_ON_MOUNT$1, d), setTimeout(() => {
					let t = new CustomEvent(AUTOFOCUS_ON_UNMOUNT$1, EVENT_OPTIONS$1);
					l.addEventListener(AUTOFOCUS_ON_UNMOUNT$1, f), l.dispatchEvent(t), t.defaultPrevented || focus$1(e ?? document.body, { select: !0 }), l.removeEventListener(AUTOFOCUS_ON_UNMOUNT$1, f), focusScopesStack$1.remove(g);
				}, 0);
			};
		}
	}, [
		l,
		d,
		f,
		g
	]);
	let _ = React$1.useCallback((e) => {
		if (!i && !a || g.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = document.activeElement;
		if (t && n) {
			let t = e.currentTarget, [a, o] = getTabbableEdges$1(t);
			a && o ? !e.shiftKey && n === o ? (e.preventDefault(), i && focus$1(a, { select: !0 })) : e.shiftKey && n === a && (e.preventDefault(), i && focus$1(o, { select: !0 })) : n === t && e.preventDefault();
		}
	}, [
		i,
		a,
		g.paused
	]);
	return /* @__PURE__ */ jsx(Primitive$1.div, {
		tabIndex: -1,
		...c,
		ref: m,
		onKeyDown: _
	});
});
FocusScope$1.displayName = FOCUS_SCOPE_NAME$1;
function focusFirst$1(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let i of e) if (focus$1(i, { select: t }), document.activeElement !== n) return;
}
function getTabbableEdges$1(e) {
	let t = getTabbableCandidates$1(e);
	return [findVisible$1(t, e), findVisible$1(t.reverse(), e)];
}
function getTabbableCandidates$1(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function findVisible$1(e, t) {
	for (let n of e) if (!isHidden$1(n, { upTo: t })) return n;
}
function isHidden$1(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function isSelectableInput$1(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function focus$1(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && isSelectableInput$1(e) && t && e.select();
	}
}
var focusScopesStack$1 = createFocusScopesStack$1();
function createFocusScopesStack$1() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = arrayRemove$1(e, t), e.unshift(t);
		},
		remove(t) {
			e = arrayRemove$1(e, t), e[0]?.resume();
		}
	};
}
function arrayRemove$1(e, t) {
	let n = [...e], i = n.indexOf(t);
	return i !== -1 && n.splice(i, 1), n;
}
function removeLinks$1(e) {
	return e.filter((e) => e.tagName !== "A");
}
var PORTAL_NAME$4 = "Portal", Portal$2 = React$1.forwardRef((t, n) => {
	let { container: i, ...a } = t, [o, s] = React$1.useState(!1);
	useLayoutEffect2$1(() => s(!0), []);
	let c = i || o && globalThis?.document?.body;
	return c ? ReactDOM.createPortal(/* @__PURE__ */ jsx(Primitive$1.div, {
		...a,
		ref: n
	}), c) : null;
});
Portal$2.displayName = PORTAL_NAME$4;
function useStateMachine$1(t, n) {
	return React$1.useReducer((e, t) => n[e][t] ?? e, t);
}
var Presence$1 = (t) => {
	let { present: n, children: i } = t, a = usePresence$1(n), o = typeof i == "function" ? i({ present: a.isPresent }) : React$1.Children.only(i), s = useComposedRefs$1(a.ref, getElementRef$2(o));
	return typeof i == "function" || a.isPresent ? React$1.cloneElement(o, { ref: s }) : null;
};
Presence$1.displayName = "Presence";
function usePresence$1(t) {
	let [n, i] = React$1.useState(), a = React$1.useRef(null), o = React$1.useRef(t), s = React$1.useRef("none"), [c, l] = useStateMachine$1(t ? "mounted" : "unmounted", {
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
		let e = getAnimationName$1(a.current);
		s.current = c === "mounted" ? e : "none";
	}, [c]), useLayoutEffect2$1(() => {
		let e = a.current, n = o.current;
		if (n !== t) {
			let i = s.current, a = getAnimationName$1(e);
			t ? l("MOUNT") : a === "none" || e?.display === "none" ? l("UNMOUNT") : l(n && i !== a ? "ANIMATION_OUT" : "UNMOUNT"), o.current = t;
		}
	}, [t, l]), useLayoutEffect2$1(() => {
		if (n) {
			let e, t = n.ownerDocument.defaultView ?? window, i = (i) => {
				let s = getAnimationName$1(a.current).includes(CSS.escape(i.animationName));
				if (i.target === n && s && (l("ANIMATION_END"), !o.current)) {
					let i = n.style.animationFillMode;
					n.style.animationFillMode = "forwards", e = t.setTimeout(() => {
						n.style.animationFillMode === "forwards" && (n.style.animationFillMode = i);
					});
				}
			}, c = (e) => {
				e.target === n && (s.current = getAnimationName$1(a.current));
			};
			return n.addEventListener("animationstart", c), n.addEventListener("animationcancel", i), n.addEventListener("animationend", i), () => {
				t.clearTimeout(e), n.removeEventListener("animationstart", c), n.removeEventListener("animationcancel", i), n.removeEventListener("animationend", i);
			};
		} else l("ANIMATION_END");
	}, [n, l]), {
		isPresent: ["mounted", "unmountSuspended"].includes(c),
		ref: React$1.useCallback((e) => {
			a.current = e ? getComputedStyle(e) : null, i(e);
		}, [])
	};
}
function getAnimationName$1(e) {
	return e?.animationName || "none";
}
function getElementRef$2(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var count$2 = 0;
function useFocusGuards$1() {
	React$1.useEffect(() => {
		let e = document.querySelectorAll("[data-radix-focus-guard]");
		return document.body.insertAdjacentElement("afterbegin", e[0] ?? createFocusGuard$1()), document.body.insertAdjacentElement("beforeend", e[1] ?? createFocusGuard$1()), count$2++, () => {
			count$2 === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), count$2--;
		};
	}, []);
}
function createFocusGuard$1() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var __assign = function() {
	return __assign = Object.assign || function(e) {
		for (var t, n = 1, i = arguments.length; n < i; n++) for (var a in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
		return e;
	}, __assign.apply(this, arguments);
};
function __rest(e, t) {
	var n = {};
	for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var a = 0, i = Object.getOwnPropertySymbols(e); a < i.length; a++) t.indexOf(i[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[a]) && (n[i[a]] = e[i[a]]);
	return n;
}
function __spreadArray(e, t, n) {
	if (n || arguments.length === 2) for (var i = 0, a = t.length, o; i < a; i++) (o || !(i in t)) && (o ||= Array.prototype.slice.call(t, 0, i), o[i] = t[i]);
	return e.concat(o || Array.prototype.slice.call(t));
}
var zeroRightClassName = "right-scroll-bar-position", fullWidthClassName = "width-before-scroll-bar", noScrollbarsClassName = "with-scroll-bars-hidden", removedBarSizeVariable = "--removed-body-scroll-bar-size";
function assignRef(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function useCallbackRef$2(e, t) {
	var n = useState(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
var useIsomorphicLayoutEffect = typeof window < "u" ? React$1.useLayoutEffect : React$1.useEffect, currentValues = /* @__PURE__ */ new WeakMap();
function useMergeRefs(e, t) {
	var n = useCallbackRef$2(t || null, function(t) {
		return e.forEach(function(e) {
			return assignRef(e, t);
		});
	});
	return useIsomorphicLayoutEffect(function() {
		var t = currentValues.get(n);
		if (t) {
			var i = new Set(t), a = new Set(e), o = n.current;
			i.forEach(function(e) {
				a.has(e) || assignRef(e, null);
			}), a.forEach(function(e) {
				i.has(e) || assignRef(e, o);
			});
		}
		currentValues.set(n, e);
	}, [e]), n;
}
function ItoI(e) {
	return e;
}
function innerCreateMedium(e, t) {
	t === void 0 && (t = ItoI);
	var n = [], i = !1;
	return {
		read: function() {
			if (i) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var a = t(e, i);
			return n.push(a), function() {
				n = n.filter(function(e) {
					return e !== a;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (i = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			i = !0;
			var t = [];
			if (n.length) {
				var a = n;
				n = [], a.forEach(e), t = n;
			}
			var o = function() {
				var n = t;
				t = [], n.forEach(e);
			}, s = function() {
				return Promise.resolve().then(o);
			};
			s(), n = {
				push: function(e) {
					t.push(e), s();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function createSidecarMedium(e) {
	e === void 0 && (e = {});
	var t = innerCreateMedium(null);
	return t.options = __assign({
		async: !0,
		ssr: !1
	}, e), t;
}
var SideCar = function(t) {
	var n = t.sideCar, i = __rest(t, ["sideCar"]);
	if (!n) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var a = n.read();
	if (!a) throw Error("Sidecar medium not found");
	return React$1.createElement(a, __assign({}, i));
};
SideCar.isSideCarExport = !0;
function exportSidecar(e, t) {
	return e.useMedium(t), SideCar;
}
var effectCar = createSidecarMedium(), nothing = function() {}, RemoveScroll = React$1.forwardRef(function(t, n) {
	var i = React$1.useRef(null), a = React$1.useState({
		onScrollCapture: nothing,
		onWheelCapture: nothing,
		onTouchMoveCapture: nothing
	}), o = a[0], s = a[1], c = t.forwardProps, l = t.children, u = t.className, d = t.removeScrollBar, f = t.enabled, p = t.shards, m = t.sideCar, h = t.noRelative, g = t.noIsolation, _ = t.inert, v = t.allowPinchZoom, y = t.as, b = y === void 0 ? "div" : y, x = t.gapMode, S = __rest(t, [
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
	]), C = m, w = useMergeRefs([i, n]), T = __assign(__assign({}, S), o);
	return React$1.createElement(React$1.Fragment, null, f && React$1.createElement(C, {
		sideCar: effectCar,
		removeScrollBar: d,
		shards: p,
		noRelative: h,
		noIsolation: g,
		inert: _,
		setCallbacks: s,
		allowPinchZoom: !!v,
		lockRef: i,
		gapMode: x
	}), c ? React$1.cloneElement(React$1.Children.only(l), __assign(__assign({}, T), { ref: w })) : React$1.createElement(b, __assign({}, T, {
		className: u,
		ref: w
	}), l));
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
	var t = getNonce();
	return t && e.setAttribute("nonce", t), e;
}
function injectStyles(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function insertStyleTag(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var stylesheetSingleton = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = makeStyleTag()) && (injectStyles(t, n), insertStyleTag(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, styleHookSingleton = function() {
	var t = stylesheetSingleton();
	return function(n, i) {
		React$1.useEffect(function() {
			return t.add(n), function() {
				t.remove();
			};
		}, [n && i]);
	};
}, styleSingleton = function() {
	var e = styleHookSingleton();
	return function(t) {
		var n = t.styles, i = t.dynamic;
		return e(n, i), null;
	};
}, zeroGap = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, parse = function(e) {
	return parseInt(e || "", 10) || 0;
}, getOffset = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], i = t[e === "padding" ? "paddingTop" : "marginTop"], a = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		parse(n),
		parse(i),
		parse(a)
	];
}, getGapWidth = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return zeroGap;
	var t = getOffset(e), n = document.documentElement.clientWidth, i = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, i - n + t[2] - t[0])
	};
}, Style = styleSingleton(), lockAttribute = "data-scroll-locked", getStyles = function(e, t, n, i) {
	var a = e.left, o = e.top, s = e.right, c = e.gap;
	return n === void 0 && (n = "margin"), `
  .${noScrollbarsClassName} {
   overflow: hidden ${i};
   padding-right: ${c}px ${i};
  }
  body[${lockAttribute}] {
    overflow: hidden ${i};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${i};`,
		n === "margin" && `
    padding-left: ${a}px;
    padding-top: ${o}px;
    padding-right: ${s}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${c}px ${i};
    `,
		n === "padding" && `padding-right: ${c}px ${i};`
	].filter(Boolean).join("")}
  }
  
  .${zeroRightClassName} {
    right: ${c}px ${i};
  }
  
  .${fullWidthClassName} {
    margin-right: ${c}px ${i};
  }
  
  .${zeroRightClassName} .${zeroRightClassName} {
    right: 0 ${i};
  }
  
  .${fullWidthClassName} .${fullWidthClassName} {
    margin-right: 0 ${i};
  }
  
  body[${lockAttribute}] {
    ${removedBarSizeVariable}: ${c}px;
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
}, RemoveScrollBar = function(t) {
	var n = t.noRelative, i = t.noImportant, a = t.gapMode, o = a === void 0 ? "margin" : a;
	useLockAttribute();
	var s = React$1.useMemo(function() {
		return getGapWidth(o);
	}, [o]);
	return React$1.createElement(Style, { styles: getStyles(s, !n, o, i ? "" : "!important") });
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
}, elementCanBeScrolled = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !alwaysContainsScroll(e) && n[t] === "visible");
}, elementCouldBeVScrolled = function(e) {
	return elementCanBeScrolled(e, "overflowY");
}, elementCouldBeHScrolled = function(e) {
	return elementCanBeScrolled(e, "overflowX");
}, locationCouldBeScrolled = function(e, t) {
	var n = t.ownerDocument, i = t;
	do {
		if (typeof ShadowRoot < "u" && i instanceof ShadowRoot && (i = i.host), elementCouldBeScrolled(e, i)) {
			var a = getScrollVariables(e, i);
			if (a[1] > a[2]) return !0;
		}
		i = i.parentNode;
	} while (i && i !== n.body);
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
}, elementCouldBeScrolled = function(e, t) {
	return e === "v" ? elementCouldBeVScrolled(t) : elementCouldBeHScrolled(t);
}, getScrollVariables = function(e, t) {
	return e === "v" ? getVScrollVariables(t) : getHScrollVariables(t);
}, getDirectionFactor = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, handleScroll = function(e, t, n, i, a) {
	var o = getDirectionFactor(e, window.getComputedStyle(t).direction), s = o * i, c = n.target, l = t.contains(c), u = !1, d = s > 0, f = 0, p = 0;
	do {
		if (!c) break;
		var m = getScrollVariables(e, c), h = m[0], g = m[1] - m[2] - o * h;
		(h || g) && elementCouldBeScrolled(e, c) && (f += g, p += h);
		var _ = c.parentNode;
		c = _ && _.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? _.host : _;
	} while (!l && c !== document.body || l && (t.contains(c) || t === c));
	return (d && (a && Math.abs(f) < 1 || !a && s > f) || !d && (a && Math.abs(p) < 1 || !a && -s > p)) && (u = !0), u;
}, getTouchXY = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, getDeltaXY = function(e) {
	return [e.deltaX, e.deltaY];
}, extractRef = function(e) {
	return e && "current" in e ? e.current : e;
}, deltaCompare = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, generateStyle = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, idCounter = 0, lockStack = [];
function RemoveScrollSideCar(t) {
	var n = React$1.useRef([]), i = React$1.useRef([0, 0]), a = React$1.useRef(), o = React$1.useState(idCounter++)[0], s = React$1.useState(styleSingleton)[0], c = React$1.useRef(t);
	React$1.useEffect(function() {
		c.current = t;
	}, [t]), React$1.useEffect(function() {
		if (t.inert) {
			document.body.classList.add(`block-interactivity-${o}`);
			var e = __spreadArray([t.lockRef.current], (t.shards || []).map(extractRef), !0).filter(Boolean);
			return e.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${o}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${o}`), e.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${o}`);
				});
			};
		}
	}, [
		t.inert,
		t.lockRef.current,
		t.shards
	]);
	var l = React$1.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !c.current.allowPinchZoom;
		var n = getTouchXY(e), o = i.current, s = "deltaX" in e ? e.deltaX : o[0] - n[0], l = "deltaY" in e ? e.deltaY : o[1] - n[1], u, d = e.target, f = Math.abs(s) > Math.abs(l) ? "h" : "v";
		if ("touches" in e && f === "h" && d.type === "range") return !1;
		var p = window.getSelection(), m = p && p.anchorNode;
		if (m && (m === d || m.contains(d))) return !1;
		var h = locationCouldBeScrolled(f, d);
		if (!h) return !0;
		if (h ? u = f : (u = f === "v" ? "h" : "v", h = locationCouldBeScrolled(f, d)), !h) return !1;
		if (!a.current && "changedTouches" in e && (s || l) && (a.current = u), !u) return !0;
		var g = a.current || u;
		return handleScroll(g, t, e, g === "h" ? s : l, !0);
	}, []), u = React$1.useCallback(function(e) {
		var t = e;
		if (!(!lockStack.length || lockStack[lockStack.length - 1] !== s)) {
			var i = "deltaY" in t ? getDeltaXY(t) : getTouchXY(t), a = n.current.filter(function(e) {
				return e.name === t.type && (e.target === t.target || t.target === e.shadowParent) && deltaCompare(e.delta, i);
			})[0];
			if (a && a.should) {
				t.cancelable && t.preventDefault();
				return;
			}
			if (!a) {
				var o = (c.current.shards || []).map(extractRef).filter(Boolean).filter(function(e) {
					return e.contains(t.target);
				});
				(o.length > 0 ? l(t, o[0]) : !c.current.noIsolation) && t.cancelable && t.preventDefault();
			}
		}
	}, []), d = React$1.useCallback(function(e, t, i, a) {
		var o = {
			name: e,
			delta: t,
			target: i,
			should: a,
			shadowParent: getOutermostShadowParent(i)
		};
		n.current.push(o), setTimeout(function() {
			n.current = n.current.filter(function(e) {
				return e !== o;
			});
		}, 1);
	}, []), f = React$1.useCallback(function(e) {
		i.current = getTouchXY(e), a.current = void 0;
	}, []), p = React$1.useCallback(function(e) {
		d(e.type, getDeltaXY(e), e.target, l(e, t.lockRef.current));
	}, []), m = React$1.useCallback(function(e) {
		d(e.type, getTouchXY(e), e.target, l(e, t.lockRef.current));
	}, []);
	React$1.useEffect(function() {
		return lockStack.push(s), t.setCallbacks({
			onScrollCapture: p,
			onWheelCapture: p,
			onTouchMoveCapture: m
		}), document.addEventListener("wheel", u, nonPassive), document.addEventListener("touchmove", u, nonPassive), document.addEventListener("touchstart", f, nonPassive), function() {
			lockStack = lockStack.filter(function(e) {
				return e !== s;
			}), document.removeEventListener("wheel", u, nonPassive), document.removeEventListener("touchmove", u, nonPassive), document.removeEventListener("touchstart", f, nonPassive);
		};
	}, []);
	var h = t.removeScrollBar, g = t.inert;
	return React$1.createElement(React$1.Fragment, null, g ? React$1.createElement(s, { styles: generateStyle(o) }) : null, h ? React$1.createElement(RemoveScrollBar, {
		noRelative: t.noRelative,
		gapMode: t.gapMode
	}) : null);
}
function getOutermostShadowParent(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar), ReactRemoveScroll = React$1.forwardRef(function(t, n) {
	return React$1.createElement(RemoveScroll, __assign({}, t, {
		ref: n,
		sideCar: sidecar_default
	}));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var Combination_default = ReactRemoveScroll, getDefaultParent = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, counterMap = /* @__PURE__ */ new WeakMap(), uncontrolledNodes = /* @__PURE__ */ new WeakMap(), markerMap = {}, lockCount = 0, unwrapHost = function(e) {
	return e && (e.host || unwrapHost(e.parentNode));
}, correctTargets = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = unwrapHost(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, applyAttributeToOthers = function(e, t, n, i) {
	var a = correctTargets(t, Array.isArray(e) ? e : [e]);
	markerMap[n] || (markerMap[n] = /* @__PURE__ */ new WeakMap());
	var o = markerMap[n], s = [], c = /* @__PURE__ */ new Set(), l = new Set(a), u = function(e) {
		!e || c.has(e) || (c.add(e), u(e.parentNode));
	};
	a.forEach(u);
	var d = function(e) {
		!e || l.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (c.has(e)) d(e);
			else try {
				var t = e.getAttribute(i), a = t !== null && t !== "false", l = (counterMap.get(e) || 0) + 1, u = (o.get(e) || 0) + 1;
				counterMap.set(e, l), o.set(e, u), s.push(e), l === 1 && a && uncontrolledNodes.set(e, !0), u === 1 && e.setAttribute(n, "true"), a || e.setAttribute(i, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return d(t), c.clear(), lockCount++, function() {
		s.forEach(function(e) {
			var t = counterMap.get(e) - 1, a = o.get(e) - 1;
			counterMap.set(e, t), o.set(e, a), t || (uncontrolledNodes.has(e) || e.removeAttribute(i), uncontrolledNodes.delete(e)), a || e.removeAttribute(n);
		}), lockCount--, lockCount || (counterMap = /* @__PURE__ */ new WeakMap(), counterMap = /* @__PURE__ */ new WeakMap(), uncontrolledNodes = /* @__PURE__ */ new WeakMap(), markerMap = {});
	};
}, hideOthers = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var i = Array.from(Array.isArray(e) ? e : [e]), a = t || getDefaultParent(e);
	return a ? (i.push.apply(i, Array.from(a.querySelectorAll("[aria-live], script"))), applyAttributeToOthers(i, a, n, "aria-hidden")) : function() {
		return null;
	};
}, DIALOG_NAME = "Dialog", [createDialogContext, createDialogScope] = createContextScope$1(DIALOG_NAME), [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME), Dialog = (t) => {
	let { __scopeDialog: n, children: i, open: a, defaultOpen: o, onOpenChange: s, modal: c = !0 } = t, l = React$1.useRef(null), u = React$1.useRef(null), [d, f] = useControllableState$1({
		prop: a,
		defaultProp: o ?? !1,
		onChange: s,
		caller: DIALOG_NAME
	});
	return /* @__PURE__ */ jsx(DialogProvider, {
		scope: n,
		triggerRef: l,
		contentRef: u,
		contentId: useId$2(),
		titleId: useId$2(),
		descriptionId: useId$2(),
		open: d,
		onOpenChange: f,
		onOpenToggle: React$1.useCallback(() => f((e) => !e), [f]),
		modal: c,
		children: i
	});
};
Dialog.displayName = DIALOG_NAME;
var TRIGGER_NAME$2 = "DialogTrigger", DialogTrigger = React$1.forwardRef((e, t) => {
	let { __scopeDialog: n, ...i } = e, a = useDialogContext(TRIGGER_NAME$2, n), o = useComposedRefs$1(t, a.triggerRef);
	return /* @__PURE__ */ jsx(Primitive$1.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": a.open,
		"aria-controls": a.contentId,
		"data-state": getState$1(a.open),
		...i,
		ref: o,
		onClick: composeEventHandlers$1(e.onClick, a.onOpenToggle)
	});
});
DialogTrigger.displayName = TRIGGER_NAME$2;
var PORTAL_NAME$3 = "DialogPortal", [PortalProvider$1, usePortalContext$1] = createDialogContext(PORTAL_NAME$3, { forceMount: void 0 }), DialogPortal = (t) => {
	let { __scopeDialog: n, forceMount: i, children: a, container: o } = t, s = useDialogContext(PORTAL_NAME$3, n);
	return /* @__PURE__ */ jsx(PortalProvider$1, {
		scope: n,
		forceMount: i,
		children: React$1.Children.map(a, (e) => /* @__PURE__ */ jsx(Presence$1, {
			present: i || s.open,
			children: /* @__PURE__ */ jsx(Portal$2, {
				asChild: !0,
				container: o,
				children: e
			})
		}))
	});
};
DialogPortal.displayName = PORTAL_NAME$3;
var OVERLAY_NAME = "DialogOverlay", DialogOverlay = React$1.forwardRef((e, t) => {
	let n = usePortalContext$1(OVERLAY_NAME, e.__scopeDialog), { forceMount: i = n.forceMount, ...a } = e, o = useDialogContext(OVERLAY_NAME, e.__scopeDialog);
	return o.modal ? /* @__PURE__ */ jsx(Presence$1, {
		present: i || o.open,
		children: /* @__PURE__ */ jsx(DialogOverlayImpl, {
			...a,
			ref: t
		})
	}) : null;
});
DialogOverlay.displayName = OVERLAY_NAME;
var Slot$2 = /* @__PURE__ */ createSlot$1("DialogOverlay.RemoveScroll"), DialogOverlayImpl = React$1.forwardRef((e, t) => {
	let { __scopeDialog: n, ...i } = e, a = useDialogContext(OVERLAY_NAME, n);
	return /* @__PURE__ */ jsx(Combination_default, {
		as: Slot$2,
		allowPinchZoom: !0,
		shards: [a.contentRef],
		children: /* @__PURE__ */ jsx(Primitive$1.div, {
			"data-state": getState$1(a.open),
			...i,
			ref: t,
			style: {
				pointerEvents: "auto",
				...i.style
			}
		})
	});
}), CONTENT_NAME$4 = "DialogContent", DialogContent = React$1.forwardRef((e, t) => {
	let n = usePortalContext$1(CONTENT_NAME$4, e.__scopeDialog), { forceMount: i = n.forceMount, ...a } = e, o = useDialogContext(CONTENT_NAME$4, e.__scopeDialog);
	return /* @__PURE__ */ jsx(Presence$1, {
		present: i || o.open,
		children: o.modal ? /* @__PURE__ */ jsx(DialogContentModal, {
			...a,
			ref: t
		}) : /* @__PURE__ */ jsx(DialogContentNonModal, {
			...a,
			ref: t
		})
	});
});
DialogContent.displayName = CONTENT_NAME$4;
var DialogContentModal = React$1.forwardRef((t, n) => {
	let i = useDialogContext(CONTENT_NAME$4, t.__scopeDialog), a = React$1.useRef(null), o = useComposedRefs$1(n, i.contentRef, a);
	return React$1.useEffect(() => {
		let e = a.current;
		if (e) return hideOthers(e);
	}, []), /* @__PURE__ */ jsx(DialogContentImpl, {
		...t,
		ref: o,
		trapFocus: i.open,
		disableOutsidePointerEvents: !0,
		onCloseAutoFocus: composeEventHandlers$1(t.onCloseAutoFocus, (e) => {
			e.preventDefault(), i.triggerRef.current?.focus();
		}),
		onPointerDownOutside: composeEventHandlers$1(t.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: composeEventHandlers$1(t.onFocusOutside, (e) => e.preventDefault())
	});
}), DialogContentNonModal = React$1.forwardRef((t, n) => {
	let i = useDialogContext(CONTENT_NAME$4, t.__scopeDialog), a = React$1.useRef(!1), o = React$1.useRef(!1);
	return /* @__PURE__ */ jsx(DialogContentImpl, {
		...t,
		ref: n,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (e) => {
			t.onCloseAutoFocus?.(e), e.defaultPrevented || (a.current || i.triggerRef.current?.focus(), e.preventDefault()), a.current = !1, o.current = !1;
		},
		onInteractOutside: (e) => {
			t.onInteractOutside?.(e), e.defaultPrevented || (a.current = !0, e.detail.originalEvent.type === "pointerdown" && (o.current = !0));
			let n = e.target;
			i.triggerRef.current?.contains(n) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && o.current && e.preventDefault();
		}
	});
}), DialogContentImpl = React$1.forwardRef((t, n) => {
	let { __scopeDialog: i, trapFocus: a, onOpenAutoFocus: o, onCloseAutoFocus: s, ...c } = t, l = useDialogContext(CONTENT_NAME$4, i), u = React$1.useRef(null), d = useComposedRefs$1(n, u);
	return useFocusGuards$1(), /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FocusScope$1, {
		asChild: !0,
		loop: !0,
		trapped: a,
		onMountAutoFocus: o,
		onUnmountAutoFocus: s,
		children: /* @__PURE__ */ jsx(DismissableLayer$1, {
			role: "dialog",
			id: l.contentId,
			"aria-describedby": l.descriptionId,
			"aria-labelledby": l.titleId,
			"data-state": getState$1(l.open),
			...c,
			ref: d,
			onDismiss: () => l.onOpenChange(!1)
		})
	}), /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(TitleWarning, { titleId: l.titleId }), /* @__PURE__ */ jsx(DescriptionWarning, {
		contentRef: u,
		descriptionId: l.descriptionId
	})] })] });
}), TITLE_NAME = "DialogTitle", DialogTitle = React$1.forwardRef((e, t) => {
	let { __scopeDialog: n, ...i } = e, a = useDialogContext(TITLE_NAME, n);
	return /* @__PURE__ */ jsx(Primitive$1.h2, {
		id: a.titleId,
		...i,
		ref: t
	});
});
DialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription", DialogDescription = React$1.forwardRef((e, t) => {
	let { __scopeDialog: n, ...i } = e, a = useDialogContext(DESCRIPTION_NAME, n);
	return /* @__PURE__ */ jsx(Primitive$1.p, {
		id: a.descriptionId,
		...i,
		ref: t
	});
});
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME$1 = "DialogClose", DialogClose = React$1.forwardRef((e, t) => {
	let { __scopeDialog: n, ...i } = e, a = useDialogContext(CLOSE_NAME$1, n);
	return /* @__PURE__ */ jsx(Primitive$1.button, {
		type: "button",
		...i,
		ref: t,
		onClick: composeEventHandlers$1(e.onClick, () => a.onOpenChange(!1))
	});
});
DialogClose.displayName = CLOSE_NAME$1;
function getState$1(e) {
	return e ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning", [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
	contentName: CONTENT_NAME$4,
	titleName: TITLE_NAME,
	docsSlug: "dialog"
}), TitleWarning = ({ titleId: t }) => {
	let n = useWarningContext(TITLE_WARNING_NAME), i = `\`${n.contentName}\` requires a \`${n.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${n.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${n.docsSlug}`;
	return React$1.useEffect(() => {
		t && (document.getElementById(t) || console.error(i));
	}, [i, t]), null;
}, DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning", DescriptionWarning = ({ contentRef: t, descriptionId: n }) => {
	let i = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${useWarningContext(DESCRIPTION_WARNING_NAME).contentName}}.`;
	return React$1.useEffect(() => {
		let e = t.current?.getAttribute("aria-describedby");
		n && e && (document.getElementById(n) || console.warn(i));
	}, [
		i,
		t,
		n
	]), null;
}, Root$3 = Dialog, Trigger$2 = DialogTrigger, Portal$4 = DialogPortal, Overlay = DialogOverlay, Content$2 = DialogContent, Title = DialogTitle, Description = DialogDescription, Close = DialogClose;
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
var Modal = Root$3, ModalTrigger = Trigger$2, ModalTextAlignContext = React$1.createContext("start");
function useModalTextAlign() {
	return React$1.useContext(ModalTextAlignContext);
}
function ModalContent({ size: e = "default", textAlign: t = "start", children: n }) {
	return /* @__PURE__ */ jsx(ModalTextAlignContext.Provider, {
		value: t,
		children: /* @__PURE__ */ jsxs(Portal$4, { children: [/* @__PURE__ */ jsx(Overlay, { className: modalOverlay }), /* @__PURE__ */ jsx(Content$2, {
			className: `${modalContentPanel} ${modalContentSize[e]}`,
			children: n
		})] })
	});
}
function ModalHeader({ title: e, description: t, titleSize: n = "default", descriptionSize: i = "default", showClose: a = !1 }) {
	let o = useModalTextAlign(), s = /* @__PURE__ */ jsxs("div", {
		className: `flex min-w-0 flex-col gap-1 ${o === "start" && a ? "pr-3" : ""}`,
		children: [/* @__PURE__ */ jsx(Title, {
			className: `${modalTitleSize[n]} text-text-primary`,
			children: e
		}), t ? /* @__PURE__ */ jsx(Description, {
			className: `${modalDescriptionSize[i]} text-text-muted`,
			children: t
		}) : null]
	}), c = `pt-5 pb-2 ${modalSectionX} ${modalTextAlign[o]}`;
	return a ? /* @__PURE__ */ jsxs("div", {
		className: `relative ${c}`,
		children: [s, /* @__PURE__ */ jsx(Close, {
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
		className: c,
		children: s
	});
}
function ModalBody({ children: e }) {
	return /* @__PURE__ */ jsx("div", {
		className: `flex-1 overflow-y-auto py-3 ${modalSectionX} ${modalTextAlign[useModalTextAlign()]}`,
		children: e
	});
}
function ModalFooter({ align: e = "end", children: t }) {
	return /* @__PURE__ */ jsx("div", {
		className: `flex flex-wrap items-center gap-3 py-4 ${modalFooterAlign[e]} ${modalSectionX}`,
		children: t
	});
}
function clamp(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
function createCollection(e) {
	let n = e + "CollectionProvider", [i, a] = createContextScope$1(n), [o, s] = i(n, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), c = (e) => {
		let { scope: n, children: i } = e, a = React.useRef(null), s = React.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ jsx(o, {
			scope: n,
			itemMap: s,
			collectionRef: a,
			children: i
		});
	};
	c.displayName = n;
	let l = e + "CollectionSlot", u = /* @__PURE__ */ createSlot$1(l), d = React.forwardRef((e, t) => {
		let { scope: n, children: i } = e;
		return /* @__PURE__ */ jsx(u, {
			ref: useComposedRefs$1(t, s(l, n).collectionRef),
			children: i
		});
	});
	d.displayName = l;
	let f = e + "CollectionItemSlot", p = "data-radix-collection-item", m = /* @__PURE__ */ createSlot$1(f), g = React.forwardRef((e, n) => {
		let { scope: i, children: a, ...o } = e, c = React.useRef(null), l = useComposedRefs$1(n, c), u = s(f, i);
		return React.useEffect(() => (u.itemMap.set(c, {
			ref: c,
			...o
		}), () => void u.itemMap.delete(c))), /* @__PURE__ */ jsx(m, {
			[p]: "",
			ref: l,
			children: a
		});
	});
	g.displayName = f;
	function _(n) {
		let i = s(e + "CollectionConsumer", n);
		return React.useCallback(() => {
			let e = i.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${p}]`));
			return Array.from(i.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [i.collectionRef, i.itemMap]);
	}
	return [
		{
			Provider: c,
			Slot: d,
			ItemSlot: g
		},
		_,
		a
	];
}
var DirectionContext = React$1.createContext(void 0);
function useDirection(t) {
	let n = React$1.useContext(DirectionContext);
	return t || n || "ltr";
}
var sides = [
	"top",
	"right",
	"bottom",
	"left"
], min$1 = Math.min, max$1 = Math.max, round = Math.round, floor = Math.floor, createCoords = (e) => ({
	x: e,
	y: e
}), oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp$1(e, t, n) {
	return max$1(e, min$1(t, n));
}
function evaluate(e, t) {
	return typeof e == "function" ? e(t) : e;
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
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function getAlignmentAxis(e) {
	return getOppositeAxis(getSideAxis(e));
}
function getAlignmentSides(e, t, n) {
	n === void 0 && (n = !1);
	let i = getAlignment(e), a = getAlignmentAxis(e), o = getAxisLength(a), s = a === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
	return t.reference[o] > t.floating[o] && (s = getOppositePlacement(s)), [s, getOppositePlacement(s)];
}
function getExpandedPlacements(e) {
	let t = getOppositePlacement(e);
	return [
		getOppositeAlignmentPlacement(e),
		t,
		getOppositeAlignmentPlacement(t)
	];
}
function getOppositeAlignmentPlacement(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var lrPlacement = ["left", "right"], rlPlacement = ["right", "left"], tbPlacement = ["top", "bottom"], btPlacement = ["bottom", "top"];
function getSideList(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? rlPlacement : lrPlacement : t ? lrPlacement : rlPlacement;
		case "left":
		case "right": return t ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(e, t, n, i) {
	let a = getAlignment(e), o = getSideList(getSide(e), n === "start", i);
	return a && (o = o.map((e) => e + "-" + a), t && (o = o.concat(o.map(getOppositeAlignmentPlacement)))), o;
}
function getOppositePlacement(e) {
	let t = getSide(e);
	return oppositeSideMap[t] + e.slice(t.length);
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
	let { x: t, y: n, width: i, height: a } = e;
	return {
		width: i,
		height: a,
		top: n,
		left: t,
		right: t + i,
		bottom: n + a,
		x: t,
		y: n
	};
}
function computeCoordsFromPlacement(e, t, n) {
	let { reference: i, floating: a } = e, o = getSideAxis(t), s = getAlignmentAxis(t), c = getAxisLength(s), l = getSide(t), u = o === "y", d = i.x + i.width / 2 - a.width / 2, f = i.y + i.height / 2 - a.height / 2, p = i[c] / 2 - a[c] / 2, m;
	switch (l) {
		case "top":
			m = {
				x: d,
				y: i.y - a.height
			};
			break;
		case "bottom":
			m = {
				x: d,
				y: i.y + i.height
			};
			break;
		case "right":
			m = {
				x: i.x + i.width,
				y: f
			};
			break;
		case "left":
			m = {
				x: i.x - a.width,
				y: f
			};
			break;
		default: m = {
			x: i.x,
			y: i.y
		};
	}
	switch (getAlignment(t)) {
		case "start":
			m[s] -= p * (n && u ? -1 : 1);
			break;
		case "end":
			m[s] += p * (n && u ? -1 : 1);
			break;
	}
	return m;
}
async function detectOverflow$1(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: i, platform: a, rects: o, elements: s, strategy: c } = e, { boundary: l = "clippingAncestors", rootBoundary: u = "viewport", elementContext: d = "floating", altBoundary: f = !1, padding: p = 0 } = evaluate(t, e), m = getPaddingObject(p), h = s[f ? d === "floating" ? "reference" : "floating" : d], g = rectToClientRect(await a.getClippingRect({
		element: await (a.isElement == null ? void 0 : a.isElement(h)) ?? !0 ? h : h.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
		boundary: l,
		rootBoundary: u,
		strategy: c
	})), _ = d === "floating" ? {
		x: n,
		y: i,
		width: o.floating.width,
		height: o.floating.height
	} : o.reference, v = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), y = await (a.isElement == null ? void 0 : a.isElement(v)) && await (a.getScale == null ? void 0 : a.getScale(v)) || {
		x: 1,
		y: 1
	}, b = rectToClientRect(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: s,
		rect: _,
		offsetParent: v,
		strategy: c
	}) : _);
	return {
		top: (g.top - b.top + m.top) / y.y,
		bottom: (b.bottom - g.bottom + m.bottom) / y.y,
		left: (g.left - b.left + m.left) / y.x,
		right: (b.right - g.right + m.right) / y.x
	};
}
var MAX_RESET_COUNT = 50, computePosition$1 = async (e, t, n) => {
	let { placement: i = "bottom", strategy: a = "absolute", middleware: o = [], platform: s } = n, c = s.detectOverflow ? s : {
		...s,
		detectOverflow: detectOverflow$1
	}, l = await (s.isRTL == null ? void 0 : s.isRTL(t)), u = await s.getElementRects({
		reference: e,
		floating: t,
		strategy: a
	}), { x: d, y: f } = computeCoordsFromPlacement(u, i, l), p = i, m = 0, h = {};
	for (let n = 0; n < o.length; n++) {
		let g = o[n];
		if (!g) continue;
		let { name: _, fn: v } = g, { x: y, y: b, data: x, reset: S } = await v({
			x: d,
			y: f,
			initialPlacement: i,
			placement: p,
			strategy: a,
			middlewareData: h,
			rects: u,
			platform: c,
			elements: {
				reference: e,
				floating: t
			}
		});
		d = y ?? d, f = b ?? f, h[_] = {
			...h[_],
			...x
		}, S && m < MAX_RESET_COUNT && (m++, typeof S == "object" && (S.placement && (p = S.placement), S.rects && (u = S.rects === !0 ? await s.getElementRects({
			reference: e,
			floating: t,
			strategy: a
		}) : S.rects), {x: d, y: f} = computeCoordsFromPlacement(u, p, l)), n = -1);
	}
	return {
		x: d,
		y: f,
		placement: p,
		strategy: a,
		middlewareData: h
	};
}, arrow$2 = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: i, placement: a, rects: o, platform: s, elements: c, middlewareData: l } = t, { element: u, padding: d = 0 } = evaluate(e, t) || {};
		if (u == null) return {};
		let f = getPaddingObject(d), p = {
			x: n,
			y: i
		}, m = getAlignmentAxis(a), h = getAxisLength(m), g = await s.getDimensions(u), _ = m === "y", v = _ ? "top" : "left", y = _ ? "bottom" : "right", b = _ ? "clientHeight" : "clientWidth", x = o.reference[h] + o.reference[m] - p[m] - o.floating[h], S = p[m] - o.reference[m], C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u)), w = C ? C[b] : 0;
		(!w || !await (s.isElement == null ? void 0 : s.isElement(C))) && (w = c.floating[b] || o.floating[h]);
		let T = x / 2 - S / 2, E = w / 2 - g[h] / 2 - 1, D = min$1(f[v], E), O = min$1(f[y], E), k = D, A = w - g[h] - O, j = w / 2 - g[h] / 2 + T, M = clamp$1(k, j, A), N = !l.arrow && getAlignment(a) != null && j !== M && o.reference[h] / 2 - (j < k ? D : O) - g[h] / 2 < 0, P = N ? j < k ? j - k : j - A : 0;
		return {
			[m]: p[m] + P,
			data: {
				[m]: M,
				centerOffset: j - M - P,
				...N && { alignmentOffset: P }
			},
			reset: N
		};
	}
}), flip$2 = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: i, middlewareData: a, rects: o, initialPlacement: s, platform: c, elements: l } = t, { mainAxis: u = !0, crossAxis: d = !0, fallbackPlacements: f, fallbackStrategy: p = "bestFit", fallbackAxisSideDirection: m = "none", flipAlignment: h = !0, ...g } = evaluate(e, t);
			if ((n = a.arrow) != null && n.alignmentOffset) return {};
			let _ = getSide(i), v = getSideAxis(s), y = getSide(s) === s, b = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), x = f || (y || !h ? [getOppositePlacement(s)] : getExpandedPlacements(s)), S = m !== "none";
			!f && S && x.push(...getOppositeAxisPlacements(s, h, m, b));
			let C = [s, ...x], w = await c.detectOverflow(t, g), T = [], E = a.flip?.overflows || [];
			if (u && T.push(w[_]), d) {
				let e = getAlignmentSides(i, o, b);
				T.push(w[e[0]], w[e[1]]);
			}
			if (E = [...E, {
				placement: i,
				overflows: T
			}], !T.every((e) => e <= 0)) {
				let e = (a.flip?.index || 0) + 1, t = C[e];
				if (t && (!(d === "alignment" && v !== getSideAxis(t)) || E.every((e) => getSideAxis(e.placement) === v ? e.overflows[0] > 0 : !0))) return {
					data: {
						index: e,
						overflows: E
					},
					reset: { placement: t }
				};
				let n = E.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (p) {
					case "bestFit": {
						let e = E.filter((e) => {
							if (S) {
								let t = getSideAxis(e.placement);
								return t === v || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = s;
						break;
				}
				if (i !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function getSideOffsets(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function isAnySideFullyClipped(e) {
	return sides.some((t) => e[t] >= 0);
}
var hide$2 = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: i } = t, { strategy: a = "referenceHidden", ...o } = evaluate(e, t);
			switch (a) {
				case "referenceHidden": {
					let e = getSideOffsets(await i.detectOverflow(t, {
						...o,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: isAnySideFullyClipped(e)
					} };
				}
				case "escaped": {
					let e = getSideOffsets(await i.detectOverflow(t, {
						...o,
						altBoundary: !0
					}), n.floating);
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
async function convertValueToCoords(e, t) {
	let { placement: n, platform: i, elements: a } = e, o = await (i.isRTL == null ? void 0 : i.isRTL(a.floating)), s = getSide(n), c = getAlignment(n), l = getSideAxis(n) === "y", u = originSides.has(s) ? -1 : 1, d = o && l ? -1 : 1, f = evaluate(t, e), { mainAxis: p, crossAxis: m, alignmentAxis: h } = typeof f == "number" ? {
		mainAxis: f,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: f.mainAxis || 0,
		crossAxis: f.crossAxis || 0,
		alignmentAxis: f.alignmentAxis
	};
	return c && typeof h == "number" && (m = c === "end" ? h * -1 : h), l ? {
		x: m * d,
		y: p * u
	} : {
		x: p * u,
		y: m * d
	};
}
var offset$2 = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: i, y: a, placement: o, middlewareData: s } = t, c = await convertValueToCoords(t, e);
			return o === s.offset?.placement && (n = s.arrow) != null && n.alignmentOffset ? {} : {
				x: i + c.x,
				y: a + c.y,
				data: {
					...c,
					placement: o
				}
			};
		}
	};
}, shift$2 = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: i, placement: a, platform: o } = t, { mainAxis: s = !0, crossAxis: c = !1, limiter: l = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...u } = evaluate(e, t), d = {
				x: n,
				y: i
			}, f = await o.detectOverflow(t, u), p = getSideAxis(getSide(a)), m = getOppositeAxis(p), h = d[m], g = d[p];
			if (s) {
				let e = m === "y" ? "top" : "left", t = m === "y" ? "bottom" : "right", n = h + f[e], i = h - f[t];
				h = clamp$1(n, h, i);
			}
			if (c) {
				let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = g + f[e], i = g - f[t];
				g = clamp$1(n, g, i);
			}
			let _ = l.fn({
				...t,
				[m]: h,
				[p]: g
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - i,
					enabled: {
						[m]: s,
						[p]: c
					}
				}
			};
		}
	};
}, limitShift$2 = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: i, placement: a, rects: o, middlewareData: s } = t, { offset: c = 0, mainAxis: l = !0, crossAxis: u = !0 } = evaluate(e, t), d = {
				x: n,
				y: i
			}, f = getSideAxis(a), p = getOppositeAxis(f), m = d[p], h = d[f], g = evaluate(c, t), _ = typeof g == "number" ? {
				mainAxis: g,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...g
			};
			if (l) {
				let e = p === "y" ? "height" : "width", t = o.reference[p] - o.floating[e] + _.mainAxis, n = o.reference[p] + o.reference[e] - _.mainAxis;
				m < t ? m = t : m > n && (m = n);
			}
			if (u) {
				let e = p === "y" ? "width" : "height", t = originSides.has(getSide(a)), n = o.reference[f] - o.floating[e] + (t && s.offset?.[f] || 0) + (t ? 0 : _.crossAxis), i = o.reference[f] + o.reference[e] + (t ? 0 : s.offset?.[f] || 0) - (t ? _.crossAxis : 0);
				h < n ? h = n : h > i && (h = i);
			}
			return {
				[p]: m,
				[f]: h
			};
		}
	};
}, size$2 = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, i;
			let { placement: a, rects: o, platform: s, elements: c } = t, { apply: l = () => {}, ...u } = evaluate(e, t), d = await s.detectOverflow(t, u), f = getSide(a), p = getAlignment(a), m = getSideAxis(a) === "y", { width: h, height: g } = o.floating, _, v;
			f === "top" || f === "bottom" ? (_ = f, v = p === (await (s.isRTL == null ? void 0 : s.isRTL(c.floating)) ? "start" : "end") ? "left" : "right") : (v = f, _ = p === "end" ? "top" : "bottom");
			let y = g - d.top - d.bottom, b = h - d.left - d.right, x = min$1(g - d[_], y), S = min$1(h - d[v], b), C = !t.middlewareData.shift, w = x, T = S;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (T = b), (i = t.middlewareData.shift) != null && i.enabled.y && (w = y), C && !p) {
				let e = max$1(d.left, 0), t = max$1(d.right, 0), n = max$1(d.top, 0), i = max$1(d.bottom, 0);
				m ? T = h - 2 * (e !== 0 || t !== 0 ? e + t : max$1(d.left, d.right)) : w = g - 2 * (n !== 0 || i !== 0 ? n + i : max$1(d.top, d.bottom));
			}
			await l({
				...t,
				availableWidth: T,
				availableHeight: w
			});
			let E = await s.getDimensions(c.floating);
			return h !== E.width || g !== E.height ? { reset: { rects: !0 } } : {};
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
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
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
	let { overflow: t, overflowX: n, overflowY: i, display: a } = getComputedStyle$1(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + i + n) && a !== "inline" && a !== "contents";
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
	let t = isElement(e) ? getComputedStyle$1(e) : e;
	return isNotNone(t.transform) || isNotNone(t.translate) || isNotNone(t.scale) || isNotNone(t.rotate) || isNotNone(t.perspective) || !isWebKit() && (isNotNone(t.backdropFilter) || isNotNone(t.filter)) || willChangeRe.test(t.willChange || "") || containRe.test(t.contain || "");
}
function getContainingBlock(e) {
	let t = getParentNode(e);
	for (; isHTMLElement(t) && !isLastTraversableNode(t);) {
		if (isContainingBlock(t)) return t;
		if (isTopLayer(t)) return null;
		t = getParentNode(t);
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
	let t = e.assignedSlot || e.parentNode || isShadowRoot(e) && e.host || getDocumentElement(e);
	return isShadowRoot(t) ? t.host : t;
}
function getNearestOverflowAncestor(e) {
	let t = getParentNode(e);
	return isLastTraversableNode(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : isHTMLElement(t) && isOverflowElement(t) ? t : getNearestOverflowAncestor(t);
}
function getOverflowAncestors(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let i = getNearestOverflowAncestor(e), a = i === e.ownerDocument?.body, o = getWindow(i);
	if (a) {
		let e = getFrameElement(o);
		return t.concat(o, o.visualViewport || [], isOverflowElement(i) ? i : [], e && n ? getOverflowAncestors(e) : []);
	} else return t.concat(i, getOverflowAncestors(i, [], n));
}
function getFrameElement(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function getCssDimensions(e) {
	let t = getComputedStyle$1(e), n = parseFloat(t.width) || 0, i = parseFloat(t.height) || 0, a = isHTMLElement(e), o = a ? e.offsetWidth : n, s = a ? e.offsetHeight : i, c = round(n) !== o || round(i) !== s;
	return c && (n = o, i = s), {
		width: n,
		height: i,
		$: c
	};
}
function unwrapElement(e) {
	return isElement(e) ? e : e.contextElement;
}
function getScale(e) {
	let t = unwrapElement(e);
	if (!isHTMLElement(t)) return createCoords(1);
	let n = t.getBoundingClientRect(), { width: i, height: a, $: o } = getCssDimensions(t), s = (o ? round(n.width) : n.width) / i, c = (o ? round(n.height) : n.height) / a;
	return (!s || !Number.isFinite(s)) && (s = 1), (!c || !Number.isFinite(c)) && (c = 1), {
		x: s,
		y: c
	};
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(e) {
	let t = getWindow(e);
	return !isWebKit() || !t.visualViewport ? noOffsets : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== getWindow(e) ? !1 : t;
}
function getBoundingClientRect(e, t, n, i) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let a = e.getBoundingClientRect(), o = unwrapElement(e), s = createCoords(1);
	t && (i ? isElement(i) && (s = getScale(i)) : s = getScale(e));
	let c = shouldAddVisualOffsets(o, n, i) ? getVisualOffsets(o) : createCoords(0), l = (a.left + c.x) / s.x, u = (a.top + c.y) / s.y, d = a.width / s.x, f = a.height / s.y;
	if (o) {
		let e = getWindow(o), t = i && isElement(i) ? getWindow(i) : i, n = e, a = getFrameElement(n);
		for (; a && i && t !== n;) {
			let e = getScale(a), t = a.getBoundingClientRect(), i = getComputedStyle$1(a), o = t.left + (a.clientLeft + parseFloat(i.paddingLeft)) * e.x, s = t.top + (a.clientTop + parseFloat(i.paddingTop)) * e.y;
			l *= e.x, u *= e.y, d *= e.x, f *= e.y, l += o, u += s, n = getWindow(a), a = getFrameElement(n);
		}
	}
	return rectToClientRect({
		width: d,
		height: f,
		x: l,
		y: u
	});
}
function getWindowScrollBarX(e, t) {
	let n = getNodeScroll(e).scrollLeft;
	return t ? t.left + n : getBoundingClientRect(getDocumentElement(e)).left + n;
}
function getHTMLOffset(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - getWindowScrollBarX(e, n),
		y: n.top + t.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(e) {
	let { elements: t, rect: n, offsetParent: i, strategy: a } = e, o = a === "fixed", s = getDocumentElement(i), c = t ? isTopLayer(t.floating) : !1;
	if (i === s || c && o) return n;
	let l = {
		scrollLeft: 0,
		scrollTop: 0
	}, u = createCoords(1), d = createCoords(0), f = isHTMLElement(i);
	if ((f || !f && !o) && ((getNodeName(i) !== "body" || isOverflowElement(s)) && (l = getNodeScroll(i)), f)) {
		let e = getBoundingClientRect(i);
		u = getScale(i), d.x = e.x + i.clientLeft, d.y = e.y + i.clientTop;
	}
	let p = s && !f && !o ? getHTMLOffset(s, l) : createCoords(0);
	return {
		width: n.width * u.x,
		height: n.height * u.y,
		x: n.x * u.x - l.scrollLeft * u.x + d.x + p.x,
		y: n.y * u.y - l.scrollTop * u.y + d.y + p.y
	};
}
function getClientRects(e) {
	return Array.from(e.getClientRects());
}
function getDocumentRect(e) {
	let t = getDocumentElement(e), n = getNodeScroll(e), i = e.ownerDocument.body, a = max$1(t.scrollWidth, t.clientWidth, i.scrollWidth, i.clientWidth), o = max$1(t.scrollHeight, t.clientHeight, i.scrollHeight, i.clientHeight), s = -n.scrollLeft + getWindowScrollBarX(e), c = -n.scrollTop;
	return getComputedStyle$1(i).direction === "rtl" && (s += max$1(t.clientWidth, i.clientWidth) - a), {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(e, t) {
	let n = getWindow(e), i = getDocumentElement(e), a = n.visualViewport, o = i.clientWidth, s = i.clientHeight, c = 0, l = 0;
	if (a) {
		o = a.width, s = a.height;
		let e = isWebKit();
		(!e || e && t === "fixed") && (c = a.offsetLeft, l = a.offsetTop);
	}
	let u = getWindowScrollBarX(i);
	if (u <= 0) {
		let e = i.ownerDocument, t = e.body, n = getComputedStyle(t), a = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, s = Math.abs(i.clientWidth - t.clientWidth - a);
		s <= SCROLLBAR_MAX && (o -= s);
	} else u <= SCROLLBAR_MAX && (o += u);
	return {
		width: o,
		height: s,
		x: c,
		y: l
	};
}
function getInnerBoundingClientRect(e, t) {
	let n = getBoundingClientRect(e, !0, t === "fixed"), i = n.top + e.clientTop, a = n.left + e.clientLeft, o = isHTMLElement(e) ? getScale(e) : createCoords(1);
	return {
		width: e.clientWidth * o.x,
		height: e.clientHeight * o.y,
		x: a * o.x,
		y: i * o.y
	};
}
function getClientRectFromClippingAncestor(e, t, n) {
	let i;
	if (t === "viewport") i = getViewportRect(e, n);
	else if (t === "document") i = getDocumentRect(getDocumentElement(e));
	else if (isElement(t)) i = getInnerBoundingClientRect(t, n);
	else {
		let n = getVisualOffsets(e);
		i = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return rectToClientRect(i);
}
function hasFixedPositionAncestor(e, t) {
	let n = getParentNode(e);
	return n === t || !isElement(n) || isLastTraversableNode(n) ? !1 : getComputedStyle$1(n).position === "fixed" || hasFixedPositionAncestor(n, t);
}
function getClippingElementAncestors(e, t) {
	let n = t.get(e);
	if (n) return n;
	let i = getOverflowAncestors(e, [], !1).filter((e) => isElement(e) && getNodeName(e) !== "body"), a = null, o = getComputedStyle$1(e).position === "fixed", s = o ? getParentNode(e) : e;
	for (; isElement(s) && !isLastTraversableNode(s);) {
		let t = getComputedStyle$1(s), n = isContainingBlock(s);
		!n && t.position === "fixed" && (a = null), (o ? !n && !a : !n && t.position === "static" && a && (a.position === "absolute" || a.position === "fixed") || isOverflowElement(s) && !n && hasFixedPositionAncestor(e, s)) ? i = i.filter((e) => e !== s) : a = t, s = getParentNode(s);
	}
	return t.set(e, i), i;
}
function getClippingRect(e) {
	let { element: t, boundary: n, rootBoundary: i, strategy: a } = e, o = [...n === "clippingAncestors" ? isTopLayer(t) ? [] : getClippingElementAncestors(t, this._c) : [].concat(n), i], s = getClientRectFromClippingAncestor(t, o[0], a), c = s.top, l = s.right, u = s.bottom, d = s.left;
	for (let e = 1; e < o.length; e++) {
		let n = getClientRectFromClippingAncestor(t, o[e], a);
		c = max$1(n.top, c), l = min$1(n.right, l), u = min$1(n.bottom, u), d = max$1(n.left, d);
	}
	return {
		width: l - d,
		height: u - c,
		x: d,
		y: c
	};
}
function getDimensions(e) {
	let { width: t, height: n } = getCssDimensions(e);
	return {
		width: t,
		height: n
	};
}
function getRectRelativeToOffsetParent(e, t, n) {
	let i = isHTMLElement(t), a = getDocumentElement(t), o = n === "fixed", s = getBoundingClientRect(e, !0, o, t), c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = createCoords(0);
	function u() {
		l.x = getWindowScrollBarX(a);
	}
	if (i || !i && !o) if ((getNodeName(t) !== "body" || isOverflowElement(a)) && (c = getNodeScroll(t)), i) {
		let e = getBoundingClientRect(t, !0, o, t);
		l.x = e.x + t.clientLeft, l.y = e.y + t.clientTop;
	} else a && u();
	o && !i && a && u();
	let d = a && !i && !o ? getHTMLOffset(a, c) : createCoords(0);
	return {
		x: s.left + c.scrollLeft - l.x - d.x,
		y: s.top + c.scrollTop - l.y - d.y,
		width: s.width,
		height: s.height
	};
}
function isStaticPositioned(e) {
	return getComputedStyle$1(e).position === "static";
}
function getTrueOffsetParent(e, t) {
	if (!isHTMLElement(e) || getComputedStyle$1(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return getDocumentElement(e) === n && (n = n.ownerDocument.body), n;
}
function getOffsetParent(e, t) {
	let n = getWindow(e);
	if (isTopLayer(e)) return n;
	if (!isHTMLElement(e)) {
		let t = getParentNode(e);
		for (; t && !isLastTraversableNode(t);) {
			if (isElement(t) && !isStaticPositioned(t)) return t;
			t = getParentNode(t);
		}
		return n;
	}
	let i = getTrueOffsetParent(e, t);
	for (; i && isTableElement(i) && isStaticPositioned(i);) i = getTrueOffsetParent(i, t);
	return i && isLastTraversableNode(i) && isStaticPositioned(i) && !isContainingBlock(i) ? n : i || getContainingBlock(e) || n;
}
var getElementRects = async function(e) {
	let t = this.getOffsetParent || getOffsetParent, n = this.getDimensions, i = await n(e.floating);
	return {
		reference: getRectRelativeToOffsetParent(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: i.width,
			height: i.height
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
function rectsAreEqual(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function observeMove(e, t) {
	let n = null, i, a = getDocumentElement(e);
	function o() {
		var e;
		clearTimeout(i), (e = n) == null || e.disconnect(), n = null;
	}
	function s(c, l) {
		c === void 0 && (c = !1), l === void 0 && (l = 1), o();
		let u = e.getBoundingClientRect(), { left: d, top: f, width: p, height: m } = u;
		if (c || t(), !p || !m) return;
		let h = floor(f), g = floor(a.clientWidth - (d + p)), _ = floor(a.clientHeight - (f + m)), v = floor(d), y = {
			rootMargin: -h + "px " + -g + "px " + -_ + "px " + -v + "px",
			threshold: max$1(0, min$1(1, l)) || 1
		}, b = !0;
		function x(t) {
			let n = t[0].intersectionRatio;
			if (n !== l) {
				if (!b) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !rectsAreEqual(u, e.getBoundingClientRect()) && s(), b = !1;
		}
		try {
			n = new IntersectionObserver(x, {
				...y,
				root: a.ownerDocument
			});
		} catch {
			n = new IntersectionObserver(x, y);
		}
		n.observe(e);
	}
	return s(!0), o;
}
function autoUpdate(e, t, n, i) {
	i === void 0 && (i = {});
	let { ancestorScroll: a = !0, ancestorResize: o = !0, elementResize: s = typeof ResizeObserver == "function", layoutShift: c = typeof IntersectionObserver == "function", animationFrame: l = !1 } = i, u = unwrapElement(e), d = a || o ? [...u ? getOverflowAncestors(u) : [], ...t ? getOverflowAncestors(t) : []] : [];
	d.forEach((e) => {
		a && e.addEventListener("scroll", n, { passive: !0 }), o && e.addEventListener("resize", n);
	});
	let f = u && c ? observeMove(u, n) : null, p = -1, m = null;
	s && (m = new ResizeObserver((e) => {
		let [i] = e;
		i && i.target === u && m && t && (m.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
			var e;
			(e = m) == null || e.observe(t);
		})), n();
	}), u && !l && m.observe(u), t && m.observe(t));
	let h, g = l ? getBoundingClientRect(e) : null;
	l && _();
	function _() {
		let t = getBoundingClientRect(e);
		g && !rectsAreEqual(g, t) && n(), g = t, h = requestAnimationFrame(_);
	}
	return n(), () => {
		var e;
		d.forEach((e) => {
			a && e.removeEventListener("scroll", n), o && e.removeEventListener("resize", n);
		}), f?.(), (e = m) == null || e.disconnect(), m = null, l && cancelAnimationFrame(h);
	};
}
var offset$1 = offset$2, shift$1 = shift$2, flip$1 = flip$2, size$1 = size$2, hide$1 = hide$2, arrow$1 = arrow$2, limitShift$1 = limitShift$2, computePosition = (e, t, n) => {
	let i = /* @__PURE__ */ new Map(), a = {
		platform,
		...n
	}, o = {
		...a.platform,
		_c: i
	};
	return computePosition$1(e, t, {
		...a,
		platform: o
	});
}, index = typeof document < "u" ? useLayoutEffect : function() {};
function deepEqual(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, i, a;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (i = n; i-- !== 0;) if (!deepEqual(e[i], t[i])) return !1;
			return !0;
		}
		if (a = Object.keys(e), n = a.length, n !== Object.keys(t).length) return !1;
		for (i = n; i-- !== 0;) if (!{}.hasOwnProperty.call(t, a[i])) return !1;
		for (i = n; i-- !== 0;) {
			let n = a[i];
			if (!(n === "_owner" && e.$$typeof) && !deepEqual(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function getDPR(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(e, t) {
	let n = getDPR(e);
	return Math.round(t * n) / n;
}
function useLatestRef(t) {
	let n = React$1.useRef(t);
	return index(() => {
		n.current = t;
	}), n;
}
function useFloating(t) {
	t === void 0 && (t = {});
	let { placement: n = "bottom", strategy: i = "absolute", middleware: a = [], platform: o, elements: { reference: s, floating: c } = {}, transform: l = !0, whileElementsMounted: u, open: d } = t, [f, p] = React$1.useState({
		x: 0,
		y: 0,
		strategy: i,
		placement: n,
		middlewareData: {},
		isPositioned: !1
	}), [m, h] = React$1.useState(a);
	deepEqual(m, a) || h(a);
	let [g, v] = React$1.useState(null), [y, b] = React$1.useState(null), x = React$1.useCallback((e) => {
		e !== T.current && (T.current = e, v(e));
	}, []), S = React$1.useCallback((e) => {
		e !== E.current && (E.current = e, b(e));
	}, []), C = s || g, w = c || y, T = React$1.useRef(null), E = React$1.useRef(null), D = React$1.useRef(f), O = u != null, k = useLatestRef(u), A = useLatestRef(o), j = useLatestRef(d), M = React$1.useCallback(() => {
		if (!T.current || !E.current) return;
		let e = {
			placement: n,
			strategy: i,
			middleware: m
		};
		A.current && (e.platform = A.current), computePosition(T.current, E.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: j.current !== !1
			};
			N.current && !deepEqual(D.current, t) && (D.current = t, ReactDOM$1.flushSync(() => {
				p(t);
			}));
		});
	}, [
		m,
		n,
		i,
		A,
		j
	]);
	index(() => {
		d === !1 && D.current.isPositioned && (D.current.isPositioned = !1, p((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [d]);
	let N = React$1.useRef(!1);
	index(() => (N.current = !0, () => {
		N.current = !1;
	}), []), index(() => {
		if (C && (T.current = C), w && (E.current = w), C && w) {
			if (k.current) return k.current(C, w, M);
			M();
		}
	}, [
		C,
		w,
		M,
		k,
		O
	]);
	let P = React$1.useMemo(() => ({
		reference: T,
		floating: E,
		setReference: x,
		setFloating: S
	}), [x, S]), F = React$1.useMemo(() => ({
		reference: C,
		floating: w
	}), [C, w]), I = React$1.useMemo(() => {
		let e = {
			position: i,
			left: 0,
			top: 0
		};
		if (!F.floating) return e;
		let t = roundByDPR(F.floating, f.x), n = roundByDPR(F.floating, f.y);
		return l ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...getDPR(F.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: i,
			left: t,
			top: n
		};
	}, [
		i,
		l,
		F.floating,
		f.x,
		f.y
	]);
	return React$1.useMemo(() => ({
		...f,
		update: M,
		refs: P,
		elements: F,
		floatingStyles: I
	}), [
		f,
		M,
		P,
		F,
		I
	]);
}
var arrow$1$1 = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: i, padding: a } = typeof e == "function" ? e(n) : e;
			return i && t(i) ? i.current == null ? {} : arrow$1({
				element: i.current,
				padding: a
			}).fn(n) : i ? arrow$1({
				element: i,
				padding: a
			}).fn(n) : {};
		}
	};
}, offset = (e, t) => {
	let n = offset$1(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, shift = (e, t) => {
	let n = shift$1(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, limitShift = (e, t) => ({
	fn: limitShift$1(e).fn,
	options: [e, t]
}), flip = (e, t) => {
	let n = flip$1(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, size = (e, t) => {
	let n = size$1(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, hide = (e, t) => {
	let n = hide$1(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, arrow = (e, t) => {
	let n = arrow$1$1(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, NAME$2 = "Arrow", Arrow$3 = React$1.forwardRef((e, t) => {
	let { children: n, width: i = 10, height: a = 5, ...o } = e;
	return /* @__PURE__ */ jsx(Primitive$1.svg, {
		...o,
		ref: t,
		width: i,
		height: a,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ jsx("polygon", { points: "0,0 30,0 15,10" })
	});
});
Arrow$3.displayName = NAME$2;
var Root$2 = Arrow$3;
function useSize$1(t) {
	let [n, i] = React$1.useState(void 0);
	return useLayoutEffect2$1(() => {
		if (t) {
			i({
				width: t.offsetWidth,
				height: t.offsetHeight
			});
			let e = new ResizeObserver((e) => {
				if (!Array.isArray(e) || !e.length) return;
				let n = e[0], a, o;
				if ("borderBoxSize" in n) {
					let e = n.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					a = t.inlineSize, o = t.blockSize;
				} else a = t.offsetWidth, o = t.offsetHeight;
				i({
					width: a,
					height: o
				});
			});
			return e.observe(t, { box: "border-box" }), () => e.unobserve(t);
		} else i(void 0);
	}, [t]), n;
}
var POPPER_NAME$1 = "Popper", [createPopperContext$1, createPopperScope$1] = createContextScope$1(POPPER_NAME$1), [PopperProvider$1, usePopperContext$1] = createPopperContext$1(POPPER_NAME$1), Popper$1 = (t) => {
	let { __scopePopper: n, children: i } = t, [a, o] = React$1.useState(null);
	return /* @__PURE__ */ jsx(PopperProvider$1, {
		scope: n,
		anchor: a,
		onAnchorChange: o,
		children: i
	});
};
Popper$1.displayName = POPPER_NAME$1;
var ANCHOR_NAME$2 = "PopperAnchor", PopperAnchor$1 = React$1.forwardRef((t, n) => {
	let { __scopePopper: i, virtualRef: a, ...o } = t, s = usePopperContext$1(ANCHOR_NAME$2, i), c = React$1.useRef(null), l = useComposedRefs$1(n, c), u = React$1.useRef(null);
	return React$1.useEffect(() => {
		let e = u.current;
		u.current = a?.current || c.current, e !== u.current && s.onAnchorChange(u.current);
	}), a ? null : /* @__PURE__ */ jsx(Primitive$1.div, {
		...o,
		ref: l
	});
});
PopperAnchor$1.displayName = ANCHOR_NAME$2;
var CONTENT_NAME$3 = "PopperContent", [PopperContentProvider$1, useContentContext$1] = createPopperContext$1(CONTENT_NAME$3), PopperContent$1 = React$1.forwardRef((t, n) => {
	let { __scopePopper: i, side: a = "bottom", sideOffset: o = 0, align: s = "center", alignOffset: c = 0, arrowPadding: l = 0, avoidCollisions: u = !0, collisionBoundary: d = [], collisionPadding: f = 0, sticky: p = "partial", hideWhenDetached: m = !1, updatePositionStrategy: g = "optimized", onPlaced: _, ...v } = t, y = usePopperContext$1(CONTENT_NAME$3, i), [b, x] = React$1.useState(null), S = useComposedRefs$1(n, (e) => x(e)), [w, T] = React$1.useState(null), E = useSize$1(w), D = E?.width ?? 0, O = E?.height ?? 0, k = a + (s === "center" ? "" : "-" + s), A = typeof f == "number" ? f : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...f
	}, j = Array.isArray(d) ? d : [d], M = j.length > 0, N = {
		padding: A,
		boundary: j.filter(isNotNull$1),
		altBoundary: M
	}, { refs: P, floatingStyles: F, placement: I, isPositioned: L, middlewareData: R } = useFloating({
		strategy: "fixed",
		placement: k,
		whileElementsMounted: (...e) => autoUpdate(...e, { animationFrame: g === "always" }),
		elements: { reference: y.anchor },
		middleware: [
			offset({
				mainAxis: o + O,
				alignmentAxis: c
			}),
			u && shift({
				mainAxis: !0,
				crossAxis: !1,
				limiter: p === "partial" ? limitShift() : void 0,
				...N
			}),
			u && flip({ ...N }),
			size({
				...N,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: i }) => {
					let { width: a, height: o } = t.reference, s = e.floating.style;
					s.setProperty("--radix-popper-available-width", `${n}px`), s.setProperty("--radix-popper-available-height", `${i}px`), s.setProperty("--radix-popper-anchor-width", `${a}px`), s.setProperty("--radix-popper-anchor-height", `${o}px`);
				}
			}),
			w && arrow({
				element: w,
				padding: l
			}),
			transformOrigin$1({
				arrowWidth: D,
				arrowHeight: O
			}),
			m && hide({
				strategy: "referenceHidden",
				...N
			})
		]
	}), [z, B] = getSideAndAlignFromPlacement$1(I), V = useCallbackRef$1(_);
	useLayoutEffect2$1(() => {
		L && V?.();
	}, [L, V]);
	let H = R.arrow?.x, U = R.arrow?.y, W = R.arrow?.centerOffset !== 0, [G, K] = React$1.useState();
	return useLayoutEffect2$1(() => {
		b && K(window.getComputedStyle(b).zIndex);
	}, [b]), /* @__PURE__ */ jsx("div", {
		ref: P.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...F,
			transform: L ? F.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: G,
			"--radix-popper-transform-origin": [R.transformOrigin?.x, R.transformOrigin?.y].join(" "),
			...R.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: t.dir,
		children: /* @__PURE__ */ jsx(PopperContentProvider$1, {
			scope: i,
			placedSide: z,
			onArrowChange: T,
			arrowX: H,
			arrowY: U,
			shouldHideArrow: W,
			children: /* @__PURE__ */ jsx(Primitive$1.div, {
				"data-side": z,
				"data-align": B,
				...v,
				ref: S,
				style: {
					...v.style,
					animation: L ? void 0 : "none"
				}
			})
		})
	});
});
PopperContent$1.displayName = CONTENT_NAME$3;
var ARROW_NAME$3 = "PopperArrow", OPPOSITE_SIDE$1 = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, PopperArrow$1 = React$1.forwardRef(function(e, t) {
	let { __scopePopper: n, ...i } = e, a = useContentContext$1(ARROW_NAME$3, n), o = OPPOSITE_SIDE$1[a.placedSide];
	return /* @__PURE__ */ jsx("span", {
		ref: a.onArrowChange,
		style: {
			position: "absolute",
			left: a.arrowX,
			top: a.arrowY,
			[o]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[a.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: "rotate(180deg)",
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[a.placedSide],
			visibility: a.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ jsx(Root$2, {
			...i,
			ref: t,
			style: {
				...i.style,
				display: "block"
			}
		})
	});
});
PopperArrow$1.displayName = ARROW_NAME$3;
function isNotNull$1(e) {
	return e !== null;
}
var transformOrigin$1 = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: i, middlewareData: a } = t, o = a.arrow?.centerOffset !== 0, s = o ? 0 : e.arrowWidth, c = o ? 0 : e.arrowHeight, [l, u] = getSideAndAlignFromPlacement$1(n), d = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[u], f = (a.arrow?.x ?? 0) + s / 2, p = (a.arrow?.y ?? 0) + c / 2, m = "", h = "";
		return l === "bottom" ? (m = o ? d : `${f}px`, h = `${-c}px`) : l === "top" ? (m = o ? d : `${f}px`, h = `${i.floating.height + c}px`) : l === "right" ? (m = `${-c}px`, h = o ? d : `${p}px`) : l === "left" && (m = `${i.floating.width + c}px`, h = o ? d : `${p}px`), { data: {
			x: m,
			y: h
		} };
	}
});
function getSideAndAlignFromPlacement$1(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var Root2$3 = Popper$1, Anchor$1 = PopperAnchor$1, Content$1 = PopperContent$1, Arrow$2 = PopperArrow$1;
function usePrevious(t) {
	let n = React$1.useRef({
		value: t,
		previous: t
	});
	return React$1.useMemo(() => (n.current.value !== t && (n.current.previous = n.current.value, n.current.value = t), n.current.previous), [t]);
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
}), NAME$1 = "VisuallyHidden", VisuallyHidden = React$1.forwardRef((e, t) => /* @__PURE__ */ jsx(Primitive$1.span, {
	...e,
	ref: t,
	style: {
		...VISUALLY_HIDDEN_STYLES,
		...e.style
	}
}));
VisuallyHidden.displayName = NAME$1;
var OPEN_KEYS = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], SELECTION_KEYS = [" ", "Enter"], SELECT_NAME = "Select", [Collection, useCollection, createCollectionScope] = createCollection(SELECT_NAME), [createSelectContext, createSelectScope] = createContextScope$1(SELECT_NAME, [createCollectionScope, createPopperScope$1]), usePopperScope$1 = createPopperScope$1(), [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME), [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME), Select$2 = (t) => {
	let { __scopeSelect: n, children: i, open: a, defaultOpen: o, onOpenChange: s, value: c, defaultValue: l, onValueChange: u, dir: d, name: f, autoComplete: p, disabled: m, required: _, form: v } = t, y = usePopperScope$1(n), [b, x] = React$1.useState(null), [S, C] = React$1.useState(null), [w, T] = React$1.useState(!1), E = useDirection(d), [D, O] = useControllableState$1({
		prop: a,
		defaultProp: o ?? !1,
		onChange: s,
		caller: SELECT_NAME
	}), [k, A] = useControllableState$1({
		prop: c,
		defaultProp: l,
		onChange: u,
		caller: SELECT_NAME
	}), j = React$1.useRef(null), M = b ? v || !!b.closest("form") : !0, [N, P] = React$1.useState(/* @__PURE__ */ new Set()), F = Array.from(N).map((e) => e.props.value).join(";");
	return /* @__PURE__ */ jsx(Root2$3, {
		...y,
		children: /* @__PURE__ */ jsxs(SelectProvider, {
			required: _,
			scope: n,
			trigger: b,
			onTriggerChange: x,
			valueNode: S,
			onValueNodeChange: C,
			valueNodeHasChildren: w,
			onValueNodeHasChildrenChange: T,
			contentId: useId$2(),
			value: k,
			onValueChange: A,
			open: D,
			onOpenChange: O,
			dir: E,
			triggerPointerDownPosRef: j,
			disabled: m,
			children: [/* @__PURE__ */ jsx(Collection.Provider, {
				scope: n,
				children: /* @__PURE__ */ jsx(SelectNativeOptionsProvider, {
					scope: t.__scopeSelect,
					onNativeOptionAdd: React$1.useCallback((e) => {
						P((t) => new Set(t).add(e));
					}, []),
					onNativeOptionRemove: React$1.useCallback((e) => {
						P((t) => {
							let n = new Set(t);
							return n.delete(e), n;
						});
					}, []),
					children: i
				})
			}), M ? /* @__PURE__ */ jsxs(SelectBubbleInput, {
				"aria-hidden": !0,
				required: _,
				tabIndex: -1,
				name: f,
				autoComplete: p,
				value: k,
				onChange: (e) => A(e.target.value),
				disabled: m,
				form: v,
				children: [k === void 0 ? /* @__PURE__ */ jsx("option", { value: "" }) : null, Array.from(N)]
			}, F) : null]
		})
	});
};
Select$2.displayName = SELECT_NAME;
var TRIGGER_NAME$1 = "SelectTrigger", SelectTrigger = React$1.forwardRef((t, n) => {
	let { __scopeSelect: i, disabled: a = !1, ...o } = t, s = usePopperScope$1(i), c = useSelectContext(TRIGGER_NAME$1, i), l = c.disabled || a, u = useComposedRefs$1(n, c.onTriggerChange), d = useCollection(i), f = React$1.useRef("touch"), [p, m, g] = useTypeaheadSearch((e) => {
		let t = d().filter((e) => !e.disabled), n = findNextItem(t, e, t.find((e) => e.value === c.value));
		n !== void 0 && c.onValueChange(n.value);
	}), _ = (e) => {
		l || (c.onOpenChange(!0), g()), e && (c.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	};
	return /* @__PURE__ */ jsx(Anchor$1, {
		asChild: !0,
		...s,
		children: /* @__PURE__ */ jsx(Primitive$1.button, {
			type: "button",
			role: "combobox",
			"aria-controls": c.contentId,
			"aria-expanded": c.open,
			"aria-required": c.required,
			"aria-autocomplete": "none",
			dir: c.dir,
			"data-state": c.open ? "open" : "closed",
			disabled: l,
			"data-disabled": l ? "" : void 0,
			"data-placeholder": shouldShowPlaceholder(c.value) ? "" : void 0,
			...o,
			ref: u,
			onClick: composeEventHandlers$1(o.onClick, (e) => {
				e.currentTarget.focus(), f.current !== "mouse" && _(e);
			}),
			onPointerDown: composeEventHandlers$1(o.onPointerDown, (e) => {
				f.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (_(e), e.preventDefault());
			}),
			onKeyDown: composeEventHandlers$1(o.onKeyDown, (e) => {
				let t = p.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && m(e.key), !(t && e.key === " ") && OPEN_KEYS.includes(e.key) && (_(), e.preventDefault());
			})
		})
	});
});
SelectTrigger.displayName = TRIGGER_NAME$1;
var VALUE_NAME = "SelectValue", SelectValue = React$1.forwardRef((e, t) => {
	let { __scopeSelect: n, className: i, style: a, children: o, placeholder: s = "", ...c } = e, l = useSelectContext(VALUE_NAME, n), { onValueNodeHasChildrenChange: u } = l, d = o !== void 0, f = useComposedRefs$1(t, l.onValueNodeChange);
	return useLayoutEffect2$1(() => {
		u(d);
	}, [u, d]), /* @__PURE__ */ jsx(Primitive$1.span, {
		...c,
		ref: f,
		style: { pointerEvents: "none" },
		children: shouldShowPlaceholder(l.value) ? /* @__PURE__ */ jsx(Fragment, { children: s }) : o
	});
});
SelectValue.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon", SelectIcon = React$1.forwardRef((e, t) => {
	let { __scopeSelect: n, children: i, ...a } = e;
	return /* @__PURE__ */ jsx(Primitive$1.span, {
		"aria-hidden": !0,
		...a,
		ref: t,
		children: i || "▼"
	});
});
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME$2 = "SelectPortal", SelectPortal = (e) => /* @__PURE__ */ jsx(Portal$2, {
	asChild: !0,
	...e
});
SelectPortal.displayName = PORTAL_NAME$2;
var CONTENT_NAME$2 = "SelectContent", SelectContent = React$1.forwardRef((t, n) => {
	let i = useSelectContext(CONTENT_NAME$2, t.__scopeSelect), [a, o] = React$1.useState();
	if (useLayoutEffect2$1(() => {
		o(new DocumentFragment());
	}, []), !i.open) {
		let e = a;
		return e ? ReactDOM$1.createPortal(/* @__PURE__ */ jsx(SelectContentProvider, {
			scope: t.__scopeSelect,
			children: /* @__PURE__ */ jsx(Collection.Slot, {
				scope: t.__scopeSelect,
				children: /* @__PURE__ */ jsx("div", { children: t.children })
			})
		}), e) : null;
	}
	return /* @__PURE__ */ jsx(SelectContentImpl, {
		...t,
		ref: n
	});
});
SelectContent.displayName = CONTENT_NAME$2;
var CONTENT_MARGIN = 10, [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME$2), CONTENT_IMPL_NAME = "SelectContentImpl", Slot$1 = /* @__PURE__ */ createSlot$1("SelectContent.RemoveScroll"), SelectContentImpl = React$1.forwardRef((t, n) => {
	let { __scopeSelect: i, position: a = "item-aligned", onCloseAutoFocus: o, onEscapeKeyDown: s, onPointerDownOutside: c, side: l, sideOffset: u, align: d, alignOffset: f, arrowPadding: p, collisionBoundary: m, collisionPadding: g, sticky: _, hideWhenDetached: v, avoidCollisions: y, ...b } = t, x = useSelectContext(CONTENT_NAME$2, i), [S, w] = React$1.useState(null), [T, E] = React$1.useState(null), D = useComposedRefs$1(n, (e) => w(e)), [O, k] = React$1.useState(null), [A, j] = React$1.useState(null), M = useCollection(i), [N, P] = React$1.useState(!1), F = React$1.useRef(!1);
	React$1.useEffect(() => {
		if (S) return hideOthers(S);
	}, [S]), useFocusGuards$1();
	let I = React$1.useCallback((e) => {
		let [t, ...n] = M().map((e) => e.ref.current), [i] = n.slice(-1), a = document.activeElement;
		for (let n of e) if (n === a || (n?.scrollIntoView({ block: "nearest" }), n === t && T && (T.scrollTop = 0), n === i && T && (T.scrollTop = T.scrollHeight), n?.focus(), document.activeElement !== a)) return;
	}, [M, T]), L = React$1.useCallback(() => I([O, S]), [
		I,
		O,
		S
	]);
	React$1.useEffect(() => {
		N && L();
	}, [N, L]);
	let { onOpenChange: R, triggerPointerDownPosRef: z } = x;
	React$1.useEffect(() => {
		if (S) {
			let e = {
				x: 0,
				y: 0
			}, t = (t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (z.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (z.current?.y ?? 0))
				};
			}, n = (n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : S.contains(n.target) || R(!1), document.removeEventListener("pointermove", t), z.current = null;
			};
			return z.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		S,
		R,
		z
	]), React$1.useEffect(() => {
		let e = () => R(!1);
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [R]);
	let [B, V] = useTypeaheadSearch((e) => {
		let t = M().filter((e) => !e.disabled), n = findNextItem(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current.focus());
	}), H = React$1.useCallback((e, t, n) => {
		let i = !F.current && !n;
		(x.value !== void 0 && x.value === t || i) && (k(e), i && (F.current = !0));
	}, [x.value]), U = React$1.useCallback(() => S?.focus(), [S]), W = React$1.useCallback((e, t, n) => {
		let i = !F.current && !n;
		(x.value !== void 0 && x.value === t || i) && j(e);
	}, [x.value]), G = a === "popper" ? SelectPopperPosition : SelectItemAlignedPosition, K = G === SelectPopperPosition ? {
		side: l,
		sideOffset: u,
		align: d,
		alignOffset: f,
		arrowPadding: p,
		collisionBoundary: m,
		collisionPadding: g,
		sticky: _,
		hideWhenDetached: v,
		avoidCollisions: y
	} : {};
	return /* @__PURE__ */ jsx(SelectContentProvider, {
		scope: i,
		content: S,
		viewport: T,
		onViewportChange: E,
		itemRefCallback: H,
		selectedItem: O,
		onItemLeave: U,
		itemTextRefCallback: W,
		focusSelectedItem: L,
		selectedItemText: A,
		position: a,
		isPositioned: N,
		searchRef: B,
		children: /* @__PURE__ */ jsx(Combination_default, {
			as: Slot$1,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ jsx(FocusScope$1, {
				asChild: !0,
				trapped: x.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: composeEventHandlers$1(o, (e) => {
					x.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ jsx(DismissableLayer$1, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: s,
					onPointerDownOutside: c,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => x.onOpenChange(!1),
					children: /* @__PURE__ */ jsx(G, {
						role: "listbox",
						id: x.contentId,
						"data-state": x.open ? "open" : "closed",
						dir: x.dir,
						onContextMenu: (e) => e.preventDefault(),
						...b,
						...K,
						onPlaced: () => P(!0),
						ref: D,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...b.style
						},
						onKeyDown: composeEventHandlers$1(b.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && V(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let t = M().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let n = e.target, i = t.indexOf(n);
									t = t.slice(i + 1);
								}
								setTimeout(() => I(t)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
});
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition", SelectItemAlignedPosition = React$1.forwardRef((t, n) => {
	let { __scopeSelect: i, onPlaced: a, ...o } = t, s = useSelectContext(CONTENT_NAME$2, i), c = useSelectContentContext(CONTENT_NAME$2, i), [l, u] = React$1.useState(null), [d, f] = React$1.useState(null), p = useComposedRefs$1(n, (e) => f(e)), m = useCollection(i), g = React$1.useRef(!1), _ = React$1.useRef(!0), { viewport: v, selectedItem: y, selectedItemText: b, focusSelectedItem: x } = c, S = React$1.useCallback(() => {
		if (s.trigger && s.valueNode && l && d && v && y && b) {
			let e = s.trigger.getBoundingClientRect(), t = d.getBoundingClientRect(), n = s.valueNode.getBoundingClientRect(), i = b.getBoundingClientRect();
			if (s.dir !== "rtl") {
				let a = i.left - t.left, o = n.left - a, s = e.left - o, c = e.width + s, u = Math.max(c, t.width), d = window.innerWidth - CONTENT_MARGIN, f = clamp(o, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, d - u)]);
				l.style.minWidth = c + "px", l.style.left = f + "px";
			} else {
				let a = t.right - i.right, o = window.innerWidth - n.right - a, s = window.innerWidth - e.right - o, c = e.width + s, u = Math.max(c, t.width), d = window.innerWidth - CONTENT_MARGIN, f = clamp(o, [CONTENT_MARGIN, Math.max(CONTENT_MARGIN, d - u)]);
				l.style.minWidth = c + "px", l.style.right = f + "px";
			}
			let o = m(), c = window.innerHeight - CONTENT_MARGIN * 2, u = v.scrollHeight, f = window.getComputedStyle(d), p = parseInt(f.borderTopWidth, 10), h = parseInt(f.paddingTop, 10), _ = parseInt(f.borderBottomWidth, 10), x = parseInt(f.paddingBottom, 10), S = p + h + u + x + _, C = Math.min(y.offsetHeight * 5, S), w = window.getComputedStyle(v), T = parseInt(w.paddingTop, 10), E = parseInt(w.paddingBottom, 10), D = e.top + e.height / 2 - CONTENT_MARGIN, O = c - D, k = y.offsetHeight / 2, A = y.offsetTop + k, j = p + h + A, M = S - j;
			if (j <= D) {
				let e = o.length > 0 && y === o[o.length - 1].ref.current;
				l.style.bottom = "0px";
				let t = d.clientHeight - v.offsetTop - v.offsetHeight, n = j + Math.max(O, k + (e ? E : 0) + t + _);
				l.style.height = n + "px";
			} else {
				let e = o.length > 0 && y === o[0].ref.current;
				l.style.top = "0px";
				let t = Math.max(D, p + v.offsetTop + (e ? T : 0) + k) + M;
				l.style.height = t + "px", v.scrollTop = j - D + v.offsetTop;
			}
			l.style.margin = `${CONTENT_MARGIN}px 0`, l.style.minHeight = C + "px", l.style.maxHeight = c + "px", a?.(), requestAnimationFrame(() => g.current = !0);
		}
	}, [
		m,
		s.trigger,
		s.valueNode,
		l,
		d,
		v,
		y,
		b,
		s.dir,
		a
	]);
	useLayoutEffect2$1(() => S(), [S]);
	let [w, T] = React$1.useState();
	return useLayoutEffect2$1(() => {
		d && T(window.getComputedStyle(d).zIndex);
	}, [d]), /* @__PURE__ */ jsx(SelectViewportProvider, {
		scope: i,
		contentWrapper: l,
		shouldExpandOnScrollRef: g,
		onScrollButtonChange: React$1.useCallback((e) => {
			e && _.current === !0 && (S(), x?.(), _.current = !1);
		}, [S, x]),
		children: /* @__PURE__ */ jsx("div", {
			ref: u,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: w
			},
			children: /* @__PURE__ */ jsx(Primitive$1.div, {
				...o,
				ref: p,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...o.style
				}
			})
		})
	});
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition", SelectPopperPosition = React$1.forwardRef((e, t) => {
	let { __scopeSelect: n, align: i = "start", collisionPadding: a = CONTENT_MARGIN, ...o } = e;
	return /* @__PURE__ */ jsx(Content$1, {
		...usePopperScope$1(n),
		...o,
		ref: t,
		align: i,
		collisionPadding: a,
		style: {
			boxSizing: "border-box",
			...o.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME$2, {}), VIEWPORT_NAME = "SelectViewport", SelectViewport = React$1.forwardRef((t, n) => {
	let { __scopeSelect: i, nonce: a, ...o } = t, s = useSelectContentContext(VIEWPORT_NAME, i), c = useSelectViewportContext(VIEWPORT_NAME, i), l = useComposedRefs$1(n, s.onViewportChange), u = React$1.useRef(0);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: a
	}), /* @__PURE__ */ jsx(Collection.Slot, {
		scope: i,
		children: /* @__PURE__ */ jsx(Primitive$1.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...o,
			ref: l,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...o.style
			},
			onScroll: composeEventHandlers$1(o.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: i } = c;
				if (i?.current && n) {
					let e = Math.abs(u.current - t.scrollTop);
					if (e > 0) {
						let i = window.innerHeight - CONTENT_MARGIN * 2, a = parseFloat(n.style.minHeight), o = parseFloat(n.style.height), s = Math.max(a, o);
						if (s < i) {
							let a = s + e, o = Math.min(i, a), c = a - o;
							n.style.height = o + "px", n.style.bottom === "0px" && (t.scrollTop = c > 0 ? c : 0, n.style.justifyContent = "flex-end");
						}
					}
				}
				u.current = t.scrollTop;
			})
		})
	})] });
});
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME = "SelectGroup", [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME), SelectGroup = React$1.forwardRef((e, t) => {
	let { __scopeSelect: n, ...i } = e, a = useId$2();
	return /* @__PURE__ */ jsx(SelectGroupContextProvider, {
		scope: n,
		id: a,
		children: /* @__PURE__ */ jsx(Primitive$1.div, {
			role: "group",
			"aria-labelledby": a,
			...i,
			ref: t
		})
	});
});
SelectGroup.displayName = GROUP_NAME;
var LABEL_NAME = "SelectLabel", SelectLabel = React$1.forwardRef((e, t) => {
	let { __scopeSelect: n, ...i } = e, a = useSelectGroupContext(LABEL_NAME, n);
	return /* @__PURE__ */ jsx(Primitive$1.div, {
		id: a.id,
		...i,
		ref: t
	});
});
SelectLabel.displayName = LABEL_NAME;
var ITEM_NAME = "SelectItem", [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME), SelectItem = React$1.forwardRef((t, n) => {
	let { __scopeSelect: i, value: a, disabled: o = !1, textValue: s, ...c } = t, l = useSelectContext(ITEM_NAME, i), u = useSelectContentContext(ITEM_NAME, i), d = l.value === a, [f, p] = React$1.useState(s ?? ""), [m, g] = React$1.useState(!1), _ = useComposedRefs$1(n, (e) => u.itemRefCallback?.(e, a, o)), v = useId$2(), y = React$1.useRef("touch"), b = () => {
		o || (l.onValueChange(a), l.onOpenChange(!1));
	};
	if (a === "") throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ jsx(SelectItemContextProvider, {
		scope: i,
		value: a,
		disabled: o,
		textId: v,
		isSelected: d,
		onItemTextChange: React$1.useCallback((e) => {
			p((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ jsx(Collection.ItemSlot, {
			scope: i,
			value: a,
			disabled: o,
			textValue: f,
			children: /* @__PURE__ */ jsx(Primitive$1.div, {
				role: "option",
				"aria-labelledby": v,
				"data-highlighted": m ? "" : void 0,
				"aria-selected": d && m,
				"data-state": d ? "checked" : "unchecked",
				"aria-disabled": o || void 0,
				"data-disabled": o ? "" : void 0,
				tabIndex: o ? void 0 : -1,
				...c,
				ref: _,
				onFocus: composeEventHandlers$1(c.onFocus, () => g(!0)),
				onBlur: composeEventHandlers$1(c.onBlur, () => g(!1)),
				onClick: composeEventHandlers$1(c.onClick, () => {
					y.current !== "mouse" && b();
				}),
				onPointerUp: composeEventHandlers$1(c.onPointerUp, () => {
					y.current === "mouse" && b();
				}),
				onPointerDown: composeEventHandlers$1(c.onPointerDown, (e) => {
					y.current = e.pointerType;
				}),
				onPointerMove: composeEventHandlers$1(c.onPointerMove, (e) => {
					y.current = e.pointerType, o ? u.onItemLeave?.() : y.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: composeEventHandlers$1(c.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && u.onItemLeave?.();
				}),
				onKeyDown: composeEventHandlers$1(c.onKeyDown, (e) => {
					u.searchRef?.current !== "" && e.key === " " || (SELECTION_KEYS.includes(e.key) && b(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
});
SelectItem.displayName = ITEM_NAME;
var ITEM_TEXT_NAME = "SelectItemText", SelectItemText = React$1.forwardRef((t, n) => {
	let { __scopeSelect: i, className: a, style: o, ...s } = t, c = useSelectContext(ITEM_TEXT_NAME, i), l = useSelectContentContext(ITEM_TEXT_NAME, i), u = useSelectItemContext(ITEM_TEXT_NAME, i), d = useSelectNativeOptionsContext(ITEM_TEXT_NAME, i), [f, p] = React$1.useState(null), v = useComposedRefs$1(n, (e) => p(e), u.onItemTextChange, (e) => l.itemTextRefCallback?.(e, u.value, u.disabled)), y = f?.textContent, b = React$1.useMemo(() => /* @__PURE__ */ jsx("option", {
		value: u.value,
		disabled: u.disabled,
		children: y
	}, u.value), [
		u.disabled,
		u.value,
		y
	]), { onNativeOptionAdd: x, onNativeOptionRemove: S } = d;
	return useLayoutEffect2$1(() => (x(b), () => S(b)), [
		x,
		S,
		b
	]), /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Primitive$1.span, {
		id: u.textId,
		...s,
		ref: v
	}), u.isSelected && c.valueNode && !c.valueNodeHasChildren ? ReactDOM$1.createPortal(s.children, c.valueNode) : null] });
});
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator", SelectItemIndicator = React$1.forwardRef((e, t) => {
	let { __scopeSelect: n, ...i } = e;
	return useSelectItemContext(ITEM_INDICATOR_NAME, n).isSelected ? /* @__PURE__ */ jsx(Primitive$1.span, {
		"aria-hidden": !0,
		...i,
		ref: t
	}) : null;
});
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton", SelectScrollUpButton = React$1.forwardRef((t, n) => {
	let i = useSelectContentContext(SCROLL_UP_BUTTON_NAME, t.__scopeSelect), a = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, t.__scopeSelect), [o, s] = React$1.useState(!1), c = useComposedRefs$1(n, a.onScrollButtonChange);
	return useLayoutEffect2$1(() => {
		if (i.viewport && i.isPositioned) {
			let e = function() {
				s(t.scrollTop > 0);
			}, t = i.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [i.viewport, i.isPositioned]), o ? /* @__PURE__ */ jsx(SelectScrollButtonImpl, {
		...t,
		ref: c,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = i;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
});
SelectScrollUpButton.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton", SelectScrollDownButton = React$1.forwardRef((t, n) => {
	let i = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, t.__scopeSelect), a = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, t.__scopeSelect), [o, s] = React$1.useState(!1), c = useComposedRefs$1(n, a.onScrollButtonChange);
	return useLayoutEffect2$1(() => {
		if (i.viewport && i.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				s(Math.ceil(t.scrollTop) < e);
			}, t = i.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [i.viewport, i.isPositioned]), o ? /* @__PURE__ */ jsx(SelectScrollButtonImpl, {
		...t,
		ref: c,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = i;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
});
SelectScrollDownButton.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = React$1.forwardRef((t, n) => {
	let { __scopeSelect: i, onAutoScroll: a, ...o } = t, s = useSelectContentContext("SelectScrollButton", i), c = React$1.useRef(null), l = useCollection(i), u = React$1.useCallback(() => {
		c.current !== null && (window.clearInterval(c.current), c.current = null);
	}, []);
	return React$1.useEffect(() => () => u(), [u]), useLayoutEffect2$1(() => {
		l().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [l]), /* @__PURE__ */ jsx(Primitive$1.div, {
		"aria-hidden": !0,
		...o,
		ref: n,
		style: {
			flexShrink: 0,
			...o.style
		},
		onPointerDown: composeEventHandlers$1(o.onPointerDown, () => {
			c.current === null && (c.current = window.setInterval(a, 50));
		}),
		onPointerMove: composeEventHandlers$1(o.onPointerMove, () => {
			s.onItemLeave?.(), c.current === null && (c.current = window.setInterval(a, 50));
		}),
		onPointerLeave: composeEventHandlers$1(o.onPointerLeave, () => {
			u();
		})
	});
}), SEPARATOR_NAME = "SelectSeparator", SelectSeparator = React$1.forwardRef((e, t) => {
	let { __scopeSelect: n, ...i } = e;
	return /* @__PURE__ */ jsx(Primitive$1.div, {
		"aria-hidden": !0,
		...i,
		ref: t
	});
});
SelectSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME$2 = "SelectArrow", SelectArrow = React$1.forwardRef((e, t) => {
	let { __scopeSelect: n, ...i } = e, a = usePopperScope$1(n), o = useSelectContext(ARROW_NAME$2, n), s = useSelectContentContext(ARROW_NAME$2, n);
	return o.open && s.position === "popper" ? /* @__PURE__ */ jsx(Arrow$2, {
		...a,
		...i,
		ref: t
	}) : null;
});
SelectArrow.displayName = ARROW_NAME$2;
var BUBBLE_INPUT_NAME = "SelectBubbleInput", SelectBubbleInput = React$1.forwardRef(({ __scopeSelect: t, value: n, ...i }, a) => {
	let o = React$1.useRef(null), s = useComposedRefs$1(a, o), c = usePrevious(n);
	return React$1.useEffect(() => {
		let e = o.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, i = Object.getOwnPropertyDescriptor(t, "value").set;
		if (c !== n && i) {
			let t = new Event("change", { bubbles: !0 });
			i.call(e, n), e.dispatchEvent(t);
		}
	}, [c, n]), /* @__PURE__ */ jsx(Primitive$1.select, {
		...i,
		style: {
			...VISUALLY_HIDDEN_STYLES,
			...i.style
		},
		ref: s,
		defaultValue: n
	});
});
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function shouldShowPlaceholder(e) {
	return e === "" || e === void 0;
}
function useTypeaheadSearch(t) {
	let n = useCallbackRef$1(t), i = React$1.useRef(""), a = React$1.useRef(0), o = React$1.useCallback((e) => {
		let t = i.current + e;
		n(t), (function e(t) {
			i.current = t, window.clearTimeout(a.current), t !== "" && (a.current = window.setTimeout(() => e(""), 1e3));
		})(t);
	}, [n]), s = React$1.useCallback(() => {
		i.current = "", window.clearTimeout(a.current);
	}, []);
	return React$1.useEffect(() => () => window.clearTimeout(a.current), []), [
		i,
		o,
		s
	];
}
function findNextItem(e, t, n) {
	let i = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1, o = wrapArray(e, Math.max(a, 0));
	i.length === 1 && (o = o.filter((e) => e !== n));
	let s = o.find((e) => e.textValue.toLowerCase().startsWith(i.toLowerCase()));
	return s === n ? void 0 : s;
}
function wrapArray(e, t) {
	return e.map((n, i) => e[(t + i) % e.length]);
}
var Root2$2 = Select$2, Trigger$1 = SelectTrigger, Value = SelectValue, Icon = SelectIcon, Portal$3 = SelectPortal, Content2$1 = SelectContent, Viewport = SelectViewport, Item = SelectItem, ItemText = SelectItemText, ItemIndicator = SelectItemIndicator;
const selectContent = [
	"relative z-50 overflow-hidden rounded-md border border-border bg-surface-elevated text-text-primary shadow-[var(--shadow-card-raised)]",
	"min-w-[var(--radix-select-trigger-width)]",
	"max-h-[min(var(--radix-select-content-available-height),16rem)]"
].join(" "), selectItem = [
	"relative flex cursor-default select-none items-center rounded-sm py-2 pr-8 pl-3 text-sm outline-none",
	"data-highlighted:bg-surface data-highlighted:text-text-primary",
	"data-disabled:pointer-events-none data-disabled:opacity-50"
].join(" ");
var Select = React$1.forwardRef(({ options: e, value: t, defaultValue: n, onValueChange: i, placeholder: a = "Select…", disabled: o = !1, errorMessage: s, id: c, variant: u, rounded: d }, f) => {
	let p = useId(), m = c ?? p, _ = `${m}-error`, v = !!s;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full flex-col gap-1.5",
		children: [/* @__PURE__ */ jsxs(Root2$2, {
			value: t,
			defaultValue: n,
			onValueChange: i,
			disabled: o,
			children: [/* @__PURE__ */ jsx("div", {
				"data-variant": u,
				"data-invalid": v || void 0,
				className: fieldVariants({
					variant: u,
					invalid: v,
					rounded: d
				}),
				children: /* @__PURE__ */ jsxs(Trigger$1, {
					ref: f,
					id: m,
					"aria-invalid": v || void 0,
					"aria-describedby": v ? _ : void 0,
					className: "flex h-full w-full min-w-0 items-center justify-between gap-2 bg-transparent text-sm outline-none disabled:cursor-not-allowed",
					children: [/* @__PURE__ */ jsx(Value, {
						placeholder: a,
						className: "truncate text-text-primary data-placeholder:text-text-subtle"
					}), /* @__PURE__ */ jsx(Icon, {
						asChild: !0,
						children: /* @__PURE__ */ jsx(ChevronDown, {
							className: "size-4 shrink-0 text-text-muted",
							"aria-hidden": !0
						})
					})]
				})
			}), /* @__PURE__ */ jsx(Portal$3, { children: /* @__PURE__ */ jsx(Content2$1, {
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
		}), s ? /* @__PURE__ */ jsx("p", {
			id: _,
			role: "alert",
			className: "text-xs text-error",
			children: s
		}) : null]
	});
});
Select.displayName = "Select", typeof window < "u" && window.document && window.document.createElement;
function composeEventHandlers(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(i) {
		if (e?.(i), n === !1 || !i.defaultPrevented) return t?.(i);
	};
}
function setRef$1(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function composeRefs(...e) {
	return (t) => {
		let n = !1, i = e.map((e) => {
			let i = setRef$1(e, t);
			return !n && typeof i == "function" && (n = !0), i;
		});
		if (n) return () => {
			for (let t = 0; t < i.length; t++) {
				let n = i[t];
				typeof n == "function" ? n() : setRef$1(e[t], null);
			}
		};
	};
}
function useComposedRefs(...t) {
	return React$1.useCallback(composeRefs(...t), t);
}
function createContextScope(t, n = []) {
	let i = [];
	function a(n, a) {
		let o = React$1.createContext(a);
		o.displayName = n + "Context";
		let s = i.length;
		i = [...i, a];
		let c = (n) => {
			let { scope: i, children: a, ...c } = n, l = i?.[t]?.[s] || o, u = React$1.useMemo(() => c, Object.values(c));
			return /* @__PURE__ */ jsx(l.Provider, {
				value: u,
				children: a
			});
		};
		c.displayName = n + "Provider";
		function l(i, c) {
			let l = c?.[t]?.[s] || o, u = React$1.useContext(l);
			if (u) return u;
			if (a !== void 0) return a;
			throw Error(`\`${i}\` must be used within \`${n}\``);
		}
		return [c, l];
	}
	let o = () => {
		let n = i.map((t) => React$1.createContext(t));
		return function(i) {
			let a = i?.[t] || n;
			return React$1.useMemo(() => ({ [`__scope${t}`]: {
				...i,
				[t]: a
			} }), [i, a]);
		};
	};
	return o.scopeName = t, [a, composeContextScopes(o, ...n)];
}
function composeContextScopes(...t) {
	let n = t[0];
	if (t.length === 1) return n;
	let i = () => {
		let i = t.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(t) {
			let a = i.reduce((e, { useScope: n, scopeName: i }) => {
				let a = n(t)[`__scope${i}`];
				return {
					...e,
					...a
				};
			}, {});
			return React$1.useMemo(() => ({ [`__scope${n.scopeName}`]: a }), [a]);
		};
	};
	return i.scopeName = n.scopeName, i;
}
/* @__NO_SIDE_EFFECTS__ */
function createSlot(t) {
	let n = React$1.forwardRef((n, i) => {
		let { children: a, ...o } = n, s = null, c = !1, l = [];
		isLazyComponent(a) && typeof use == "function" && (a = use(a._payload)), React$1.Children.forEach(a, (e) => {
			if (isSlottable(e)) {
				c = !0;
				let t = e, n = "child" in t.props ? t.props.child : t.props.children;
				isLazyComponent(n) && typeof use == "function" && (n = use(n._payload)), s = getSlottableElementFromSlottable(t, n), l.push(s?.props?.children);
			} else l.push(e);
		}), s ? s = React$1.cloneElement(s, void 0, l) : !c && React$1.Children.count(a) === 1 && React$1.isValidElement(a) && (s = a);
		let u = s ? getElementRef$1(s) : void 0, d = useComposedRefs(i, u);
		if (!s) {
			if (a || a === 0) throw Error(c ? createSlottableError(t) : createSlotError(t));
			return a;
		}
		let f = mergeProps(o, s.props ?? {});
		return s.type !== React$1.Fragment && (f.ref = i ? d : u), React$1.cloneElement(s, f);
	});
	return n.displayName = `${t}.Slot`, n;
}
var SLOTTABLE_IDENTIFIER = Symbol.for("radix.slottable"), getSlottableElementFromSlottable = (t, n) => {
	if ("child" in t.props) {
		let n = t.props.child;
		return React$1.isValidElement(n) ? React$1.cloneElement(n, void 0, t.props.children(n.props.children)) : null;
	}
	return React$1.isValidElement(n) ? n : null;
};
function mergeProps(e, t) {
	let n = { ...t };
	for (let i in t) {
		let a = e[i], o = t[i];
		/^on[A-Z]/.test(i) ? a && o ? n[i] = (...e) => {
			let t = o(...e);
			return a(...e), t;
		} : a && (n[i] = a) : i === "style" ? n[i] = {
			...a,
			...o
		} : i === "className" && (n[i] = [a, o].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function getElementRef$1(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function isSlottable(t) {
	return React$1.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === SLOTTABLE_IDENTIFIER;
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
function isLazyComponent(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === REACT_LAZY_TYPE && "_payload" in e && isPromiseLike(e._payload);
}
function isPromiseLike(e) {
	return typeof e == "object" && !!e && "then" in e;
}
var createSlotError = (e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, createSlottableError = (e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, use = React$1.use, Primitive = [
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
].reduce((t, n) => {
	let i = /* @__PURE__ */ createSlot(`Primitive.${n}`), a = React$1.forwardRef((e, t) => {
		let { asChild: a, ...o } = e, s = a ? i : n;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ jsx(s, {
			...o,
			ref: t
		});
	});
	return a.displayName = `Primitive.${n}`, {
		...t,
		[n]: a
	};
}, {});
function dispatchDiscreteCustomEvent(e, t) {
	e && ReactDOM$1.flushSync(() => e.dispatchEvent(t));
}
function useCallbackRef(t) {
	let n = React$1.useRef(t);
	return React$1.useEffect(() => {
		n.current = t;
	}), React$1.useMemo(() => ((...e) => n.current?.(...e)), []);
}
var useLayoutEffect2 = globalThis?.document ? React$1.useLayoutEffect : () => {}, useReactEffectEvent = React$1.useEffectEvent, useReactInsertionEffect = React$1.useInsertionEffect;
function useEffectEvent(t) {
	if (typeof useReactEffectEvent == "function") return useReactEffectEvent(t);
	let n = React$1.useRef(() => {
		throw Error("Cannot call an event handler while rendering.");
	});
	return typeof useReactInsertionEffect == "function" ? useReactInsertionEffect(() => {
		n.current = t;
	}) : useLayoutEffect2(() => {
		n.current = t;
	}), React$1.useMemo(() => ((...e) => n.current?.(...e)), []);
}
var DISMISSABLE_LAYER_NAME = "DismissableLayer", CONTEXT_UPDATE = "dismissableLayer.update", POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside", FOCUS_OUTSIDE = "dismissableLayer.focusOutside", originalBodyPointerEvents, DismissableLayerContext = React$1.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
}), DismissableLayer = React$1.forwardRef((t, n) => {
	let { disableOutsidePointerEvents: i = !1, deferPointerDownOutside: a = !1, onEscapeKeyDown: o, onPointerDownOutside: s, onFocusOutside: c, onInteractOutside: l, onDismiss: u, ...d } = t, f = React$1.useContext(DismissableLayerContext), [p, m] = React$1.useState(null), g = p?.ownerDocument ?? globalThis?.document, [, _] = React$1.useState({}), v = useComposedRefs(n, m), y = Array.from(f.layers), [b] = [...f.layersWithOutsidePointerEventsDisabled].slice(-1), x = y.indexOf(b), S = p ? y.indexOf(p) : -1, C = f.layersWithOutsidePointerEventsDisabled.size > 0, w = S >= x, T = React$1.useRef(!1), E = usePointerDownOutside((e) => {
		let t = e.target;
		if (!(t instanceof Node)) return;
		let n = [...f.branches].some((e) => e.contains(t));
		!w || n || (s?.(e), l?.(e), e.defaultPrevented || u?.());
	}, {
		ownerDocument: g,
		deferPointerDownOutside: a,
		isDeferredPointerDownOutsideRef: T,
		dismissableSurfaces: f.dismissableSurfaces
	}), D = useFocusOutside((e) => {
		if (a && T.current) return;
		let t = e.target;
		[...f.branches].some((e) => e.contains(t)) || (c?.(e), l?.(e), e.defaultPrevented || u?.());
	}, g), O = p ? S === y.length - 1 : !1, k = useEffectEvent((e) => {
		e.key === "Escape" && (o?.(e), !e.defaultPrevented && u && (e.preventDefault(), u()));
	});
	return React$1.useEffect(() => {
		if (O) return g.addEventListener("keydown", k, { capture: !0 }), () => g.removeEventListener("keydown", k, { capture: !0 });
	}, [g, O]), React$1.useEffect(() => {
		if (p) return i && (f.layersWithOutsidePointerEventsDisabled.size === 0 && (originalBodyPointerEvents = g.body.style.pointerEvents, g.body.style.pointerEvents = "none"), f.layersWithOutsidePointerEventsDisabled.add(p)), f.layers.add(p), dispatchUpdate(), () => {
			i && (f.layersWithOutsidePointerEventsDisabled.delete(p), f.layersWithOutsidePointerEventsDisabled.size === 0 && (g.body.style.pointerEvents = originalBodyPointerEvents));
		};
	}, [
		p,
		g,
		i,
		f
	]), React$1.useEffect(() => () => {
		p && (f.layers.delete(p), f.layersWithOutsidePointerEventsDisabled.delete(p), dispatchUpdate());
	}, [p, f]), React$1.useEffect(() => {
		let e = () => _({});
		return document.addEventListener(CONTEXT_UPDATE, e), () => document.removeEventListener(CONTEXT_UPDATE, e);
	}, []), /* @__PURE__ */ jsx(Primitive.div, {
		...d,
		ref: v,
		style: {
			pointerEvents: C ? w ? "auto" : "none" : void 0,
			...t.style
		},
		onFocusCapture: composeEventHandlers(t.onFocusCapture, D.onFocusCapture),
		onBlurCapture: composeEventHandlers(t.onBlurCapture, D.onBlurCapture),
		onPointerDownCapture: composeEventHandlers(t.onPointerDownCapture, E.onPointerDownCapture)
	});
});
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch", DismissableLayerBranch = React$1.forwardRef((t, n) => {
	let i = React$1.useContext(DismissableLayerContext), a = React$1.useRef(null), o = useComposedRefs(n, a);
	return React$1.useEffect(() => {
		let e = a.current;
		if (e) return i.branches.add(e), () => {
			i.branches.delete(e);
		};
	}, [i.branches]), /* @__PURE__ */ jsx(Primitive.div, {
		...t,
		ref: o
	});
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(t, n) {
	let { ownerDocument: i = globalThis?.document, deferPointerDownOutside: a = !1, isDeferredPointerDownOutsideRef: o, dismissableSurfaces: s } = n, c = useCallbackRef(t), l = React$1.useRef(!1), u = React$1.useRef(!1), d = React$1.useRef(/* @__PURE__ */ new Map()), f = React$1.useRef(() => {});
	return React$1.useEffect(() => {
		function e() {
			u.current = !1, o.current = !1, d.current.clear();
		}
		function t() {
			return Array.from(d.current.values()).some(Boolean);
		}
		function n(e) {
			if (!u.current) return;
			let t = e.target;
			t instanceof Node && [...s].some((e) => e.contains(t)) || d.current.set(e.type, !0), e.type === "click" && window.setTimeout(() => {
				u.current && f.current();
			}, 0);
		}
		function p(e) {
			u.current && d.current.set(e.type, !1);
		}
		let m = (n) => {
			if (n.target && !l.current) {
				let s = function() {
					i.removeEventListener("click", f.current);
					let n = t();
					e(), n || handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, c, l, { discrete: !0 });
				}, l = { originalEvent: n };
				u.current = !0, o.current = a && n.button === 0, d.current.clear(), !a || n.button !== 0 ? s() : (i.removeEventListener("click", f.current), f.current = s, i.addEventListener("click", f.current, { once: !0 }));
			} else i.removeEventListener("click", f.current), e();
			l.current = !1;
		}, h = [
			"pointerup",
			"mousedown",
			"mouseup",
			"touchstart",
			"touchend",
			"click"
		];
		for (let e of h) i.addEventListener(e, n, !0), i.addEventListener(e, p);
		let g = window.setTimeout(() => {
			i.addEventListener("pointerdown", m);
		}, 0);
		return () => {
			window.clearTimeout(g), i.removeEventListener("pointerdown", m), i.removeEventListener("click", f.current);
			for (let e of h) i.removeEventListener(e, n, !0), i.removeEventListener(e, p);
		};
	}, [
		i,
		c,
		a,
		o,
		s
	]), { onPointerDownCapture: () => l.current = !0 };
}
function useFocusOutside(t, n = globalThis?.document) {
	let i = useCallbackRef(t), a = React$1.useRef(!1);
	return React$1.useEffect(() => {
		let e = (e) => {
			e.target && !a.current && handleAndDispatchCustomEvent(FOCUS_OUTSIDE, i, { originalEvent: e }, { discrete: !1 });
		};
		return n.addEventListener("focusin", e), () => n.removeEventListener("focusin", e);
	}, [n, i]), {
		onFocusCapture: () => a.current = !0,
		onBlurCapture: () => a.current = !1
	};
}
function dispatchUpdate() {
	let e = new CustomEvent(CONTEXT_UPDATE);
	document.dispatchEvent(e);
}
function handleAndDispatchCustomEvent(e, t, n, { discrete: i }) {
	let a = n.originalEvent.target, o = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && a.addEventListener(e, t, { once: !0 }), i ? dispatchDiscreteCustomEvent(a, o) : a.dispatchEvent(o);
}
var count$1 = 0, guards = null;
function useFocusGuards() {
	React$1.useEffect(() => {
		guards ||= {
			start: createFocusGuard(),
			end: createFocusGuard()
		};
		let { start: e, end: t } = guards;
		return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== t && document.body.insertAdjacentElement("beforeend", t), count$1++, () => {
			count$1 === 1 && (guards?.start.remove(), guards?.end.remove(), guards = null), count$1 = Math.max(0, count$1 - 1);
		};
	}, []);
}
function createFocusGuard() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount", AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount", EVENT_OPTIONS = {
	bubbles: !1,
	cancelable: !0
}, FOCUS_SCOPE_NAME = "FocusScope", FocusScope = React$1.forwardRef((t, n) => {
	let { loop: i = !1, trapped: a = !1, onMountAutoFocus: o, onUnmountAutoFocus: s, ...c } = t, [l, u] = React$1.useState(null), d = useCallbackRef(o), f = useCallbackRef(s), p = React$1.useRef(null), m = useComposedRefs(n, u), g = React$1.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	React$1.useEffect(() => {
		if (a) {
			let e = function(e) {
				if (g.paused || !l) return;
				let t = e.target;
				l.contains(t) ? p.current = t : focus(p.current, { select: !0 });
			}, t = function(e) {
				if (g.paused || !l) return;
				let t = e.relatedTarget;
				t !== null && (l.contains(t) || focus(p.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && focus(l);
			};
			document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let i = new MutationObserver(n);
			return l && i.observe(l, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), i.disconnect();
			};
		}
	}, [
		a,
		l,
		g.paused
	]), React$1.useEffect(() => {
		if (l) {
			focusScopesStack.add(g);
			let e = document.activeElement;
			if (!l.contains(e)) {
				let t = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
				l.addEventListener(AUTOFOCUS_ON_MOUNT, d), l.dispatchEvent(t), t.defaultPrevented || (focusFirst(removeLinks(getTabbableCandidates(l)), { select: !0 }), document.activeElement === e && focus(l));
			}
			return () => {
				l.removeEventListener(AUTOFOCUS_ON_MOUNT, d), setTimeout(() => {
					let t = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
					l.addEventListener(AUTOFOCUS_ON_UNMOUNT, f), l.dispatchEvent(t), t.defaultPrevented || focus(e ?? document.body, { select: !0 }), l.removeEventListener(AUTOFOCUS_ON_UNMOUNT, f), focusScopesStack.remove(g);
				}, 0);
			};
		}
	}, [
		l,
		d,
		f,
		g
	]);
	let _ = React$1.useCallback((e) => {
		if (!i && !a || g.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = document.activeElement;
		if (t && n) {
			let t = e.currentTarget, [a, o] = getTabbableEdges(t);
			a && o ? !e.shiftKey && n === o ? (e.preventDefault(), i && focus(a, { select: !0 })) : e.shiftKey && n === a && (e.preventDefault(), i && focus(o, { select: !0 })) : n === t && e.preventDefault();
		}
	}, [
		i,
		a,
		g.paused
	]);
	return /* @__PURE__ */ jsx(Primitive.div, {
		tabIndex: -1,
		...c,
		ref: m,
		onKeyDown: _
	});
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let i of e) if (focus(i, { select: t }), document.activeElement !== n) return;
}
function getTabbableEdges(e) {
	let t = getTabbableCandidates(e);
	return [findVisible(t, e), findVisible(t.reverse(), e)];
}
function getTabbableCandidates(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function findVisible(e, t) {
	for (let n of e) if (!isHidden(n, { upTo: t })) return n;
}
function isHidden(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function isSelectableInput(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function focus(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && isSelectableInput(e) && t && e.select();
	}
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = arrayRemove(e, t), e.unshift(t);
		},
		remove(t) {
			e = arrayRemove(e, t), e[0]?.resume();
		}
	};
}
function arrayRemove(e, t) {
	let n = [...e], i = n.indexOf(t);
	return i !== -1 && n.splice(i, 1), n;
}
function removeLinks(e) {
	return e.filter((e) => e.tagName !== "A");
}
var useReactId = React$1.useId || (() => void 0), count = 0;
function useId$1(t) {
	let [n, i] = React$1.useState(useReactId());
	return useLayoutEffect2(() => {
		t || i((e) => e ?? String(count++));
	}, [t]), t || (n ? `radix-${n}` : "");
}
var NAME = "Arrow", Arrow$1 = React$1.forwardRef((e, t) => {
	let { children: n, width: i = 10, height: a = 5, ...o } = e;
	return /* @__PURE__ */ jsx(Primitive.svg, {
		...o,
		ref: t,
		width: i,
		height: a,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ jsx("polygon", { points: "0,0 30,0 15,10" })
	});
});
Arrow$1.displayName = NAME;
var Root$1 = Arrow$1;
function useSize(t) {
	let [n, i] = React$1.useState(void 0);
	return useLayoutEffect2(() => {
		if (t) {
			i({
				width: t.offsetWidth,
				height: t.offsetHeight
			});
			let e = new ResizeObserver((e) => {
				if (!Array.isArray(e) || !e.length) return;
				let n = e[0], a, o;
				if ("borderBoxSize" in n) {
					let e = n.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					a = t.inlineSize, o = t.blockSize;
				} else a = t.offsetWidth, o = t.offsetHeight;
				i({
					width: a,
					height: o
				});
			});
			return e.observe(t, { box: "border-box" }), () => e.unobserve(t);
		} else i(void 0);
	}, [t]), n;
}
var POPPER_NAME = "Popper", [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME), [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME), Popper = (t) => {
	let { __scopePopper: n, children: i } = t, [a, o] = React$1.useState(null), [s, c] = React$1.useState(void 0);
	return /* @__PURE__ */ jsx(PopperProvider, {
		scope: n,
		anchor: a,
		onAnchorChange: o,
		placementState: s,
		setPlacementState: c,
		children: i
	});
};
Popper.displayName = POPPER_NAME;
var ANCHOR_NAME$1 = "PopperAnchor", PopperAnchor = React$1.forwardRef((t, n) => {
	let { __scopePopper: i, virtualRef: a, ...o } = t, s = usePopperContext(ANCHOR_NAME$1, i), c = React$1.useRef(null), l = s.onAnchorChange, u = useComposedRefs(n, React$1.useCallback((e) => {
		c.current = e, e && l(e);
	}, [l])), d = React$1.useRef(null);
	React$1.useEffect(() => {
		if (!a) return;
		let e = d.current;
		d.current = a.current, e !== d.current && l(d.current);
	});
	let f = s.placementState && getSideAndAlignFromPlacement(s.placementState), p = f?.[0], m = f?.[1];
	return a ? null : /* @__PURE__ */ jsx(Primitive.div, {
		"data-radix-popper-side": p,
		"data-radix-popper-align": m,
		...o,
		ref: u
	});
});
PopperAnchor.displayName = ANCHOR_NAME$1;
var CONTENT_NAME$1 = "PopperContent", [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$1), PopperContent = React$1.forwardRef((t, n) => {
	let { __scopePopper: i, side: a = "bottom", sideOffset: o = 0, align: s = "center", alignOffset: c = 0, arrowPadding: l = 0, avoidCollisions: u = !0, collisionBoundary: d = [], collisionPadding: f = 0, sticky: p = "partial", hideWhenDetached: m = !1, updatePositionStrategy: g = "optimized", onPlaced: _, ...v } = t, y = usePopperContext(CONTENT_NAME$1, i), [b, x] = React$1.useState(null), S = useComposedRefs(n, x), [C, w] = React$1.useState(null), T = useSize(C), E = T?.width ?? 0, D = T?.height ?? 0, O = a + (s === "center" ? "" : "-" + s), k = typeof f == "number" ? f : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...f
	}, A = Array.isArray(d) ? d : [d], j = A.length > 0, M = {
		padding: k,
		boundary: A.filter(isNotNull),
		altBoundary: j
	}, { refs: N, floatingStyles: P, placement: F, isPositioned: I, middlewareData: L } = useFloating({
		strategy: "fixed",
		placement: O,
		whileElementsMounted: (...e) => autoUpdate(...e, { animationFrame: g === "always" }),
		elements: { reference: y.anchor },
		middleware: [
			offset({
				mainAxis: o + D,
				alignmentAxis: c
			}),
			u && shift({
				mainAxis: !0,
				crossAxis: !1,
				limiter: p === "partial" ? limitShift() : void 0,
				...M
			}),
			u && flip({ ...M }),
			size({
				...M,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: i }) => {
					let { width: a, height: o } = t.reference, s = e.floating.style;
					s.setProperty("--radix-popper-available-width", `${n}px`), s.setProperty("--radix-popper-available-height", `${i}px`), s.setProperty("--radix-popper-anchor-width", `${a}px`), s.setProperty("--radix-popper-anchor-height", `${o}px`);
				}
			}),
			C && arrow({
				element: C,
				padding: l
			}),
			transformOrigin({
				arrowWidth: E,
				arrowHeight: D
			}),
			m && hide({
				strategy: "referenceHidden",
				...M,
				boundary: j ? M.boundary : void 0
			})
		]
	}), R = y.setPlacementState;
	useLayoutEffect2(() => (R(F), () => {
		R(void 0);
	}), [F, R]);
	let [z, B] = getSideAndAlignFromPlacement(F), V = useCallbackRef(_);
	useLayoutEffect2(() => {
		I && V?.();
	}, [I, V]);
	let H = L.arrow?.x, U = L.arrow?.y, W = L.arrow?.centerOffset !== 0, [G, K] = React$1.useState();
	return useLayoutEffect2(() => {
		b && K(window.getComputedStyle(b).zIndex);
	}, [b]), /* @__PURE__ */ jsx("div", {
		ref: N.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...P,
			transform: I ? P.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: G,
			"--radix-popper-transform-origin": [L.transformOrigin?.x, L.transformOrigin?.y].join(" "),
			...L.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: t.dir,
		children: /* @__PURE__ */ jsx(PopperContentProvider, {
			scope: i,
			placedSide: z,
			placedAlign: B,
			onArrowChange: w,
			arrowX: H,
			arrowY: U,
			shouldHideArrow: W,
			children: /* @__PURE__ */ jsx(Primitive.div, {
				"data-side": z,
				"data-align": B,
				...v,
				ref: S,
				style: {
					...v.style,
					animation: I ? void 0 : "none"
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
}, PopperArrow = React$1.forwardRef(function(e, t) {
	let { __scopePopper: n, ...i } = e, a = useContentContext(ARROW_NAME$1, n), o = OPPOSITE_SIDE[a.placedSide];
	return /* @__PURE__ */ jsx("span", {
		ref: a.onArrowChange,
		style: {
			position: "absolute",
			left: a.arrowX,
			top: a.arrowY,
			[o]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[a.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: "rotate(180deg)",
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[a.placedSide],
			visibility: a.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ jsx(Root$1, {
			...i,
			ref: t,
			style: {
				...i.style,
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
	fn(t) {
		let { placement: n, rects: i, middlewareData: a } = t, o = a.arrow?.centerOffset !== 0, s = o ? 0 : e.arrowWidth, c = o ? 0 : e.arrowHeight, [l, u] = getSideAndAlignFromPlacement(n), d = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[u], f = (a.arrow?.x ?? 0) + s / 2, p = (a.arrow?.y ?? 0) + c / 2, m = "", h = "";
		return l === "bottom" ? (m = o ? d : `${f}px`, h = `${-c}px`) : l === "top" ? (m = o ? d : `${f}px`, h = `${i.floating.height + c}px`) : l === "right" ? (m = `${-c}px`, h = o ? d : `${p}px`) : l === "left" && (m = `${i.floating.width + c}px`, h = o ? d : `${p}px`), { data: {
			x: m,
			y: h
		} };
	}
});
function getSideAndAlignFromPlacement(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var Root2$1 = Popper, Anchor = PopperAnchor, Content = PopperContent, Arrow = PopperArrow, PORTAL_NAME$1 = "Portal", Portal = React$1.forwardRef((t, n) => {
	let { container: i, ...a } = t, [o, s] = React$1.useState(!1);
	useLayoutEffect2(() => s(!0), []);
	let c = i || o && globalThis?.document?.body;
	return c ? ReactDOM$1.createPortal(/* @__PURE__ */ jsx(Primitive.div, {
		...a,
		ref: n
	}), c) : null;
});
Portal.displayName = PORTAL_NAME$1;
function useStateMachine(t, n) {
	return React$1.useReducer((e, t) => n[e][t] ?? e, t);
}
var Presence = (t) => {
	let { present: n, children: i } = t, a = usePresence(n), o = typeof i == "function" ? i({ present: a.isPresent }) : React$1.Children.only(i), s = useStableComposedRefs(a.ref, getElementRef(o));
	return typeof i == "function" || a.isPresent ? React$1.cloneElement(o, { ref: s }) : null;
};
Presence.displayName = "Presence";
function usePresence(t) {
	let [n, i] = React$1.useState(), a = React$1.useRef(null), o = React$1.useRef(t), s = React$1.useRef("none"), [c, l] = useStateMachine(t ? "mounted" : "unmounted", {
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
		let e = getAnimationName(a.current);
		s.current = c === "mounted" ? e : "none";
	}, [c]), useLayoutEffect2(() => {
		let e = a.current, n = o.current;
		if (n !== t) {
			let i = s.current, a = getAnimationName(e);
			t ? l("MOUNT") : a === "none" || e?.display === "none" ? l("UNMOUNT") : l(n && i !== a ? "ANIMATION_OUT" : "UNMOUNT"), o.current = t;
		}
	}, [t, l]), useLayoutEffect2(() => {
		if (n) {
			let e, t = n.ownerDocument.defaultView ?? window, i = (i) => {
				let s = getAnimationName(a.current).includes(CSS.escape(i.animationName));
				if (i.target === n && s && (l("ANIMATION_END"), !o.current)) {
					let i = n.style.animationFillMode;
					n.style.animationFillMode = "forwards", e = t.setTimeout(() => {
						n.style.animationFillMode === "forwards" && (n.style.animationFillMode = i);
					});
				}
			}, c = (e) => {
				e.target === n && (s.current = getAnimationName(a.current));
			};
			return n.addEventListener("animationstart", c), n.addEventListener("animationcancel", i), n.addEventListener("animationend", i), () => {
				t.clearTimeout(e), n.removeEventListener("animationstart", c), n.removeEventListener("animationcancel", i), n.removeEventListener("animationend", i);
			};
		} else l("ANIMATION_END");
	}, [n, l]), {
		isPresent: ["mounted", "unmountSuspended"].includes(c),
		ref: React$1.useCallback((e) => {
			a.current = e ? getComputedStyle(e) : null, i(e);
		}, [])
	};
}
function setRef(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function useStableComposedRefs(...t) {
	let n = React$1.useRef(t);
	return n.current = t, React$1.useCallback((e) => {
		let t = n.current, i = !1, a = t.map((t) => {
			let n = setRef(t, e);
			return !i && typeof n == "function" && (i = !0), n;
		});
		if (i) return () => {
			for (let e = 0; e < a.length; e++) {
				let n = a[e];
				typeof n == "function" ? n() : setRef(t[e], null);
			}
		};
	}, []);
}
function getAnimationName(e) {
	return e?.animationName || "none";
}
function getElementRef(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var useInsertionEffect = React$1.useInsertionEffect || useLayoutEffect2;
function useControllableState({ prop: t, defaultProp: n, onChange: i = () => {}, caller: a }) {
	let [o, s, c] = useUncontrolledState({
		defaultProp: n,
		onChange: i
	}), l = t !== void 0, u = l ? t : o;
	{
		let n = React$1.useRef(t !== void 0);
		React$1.useEffect(() => {
			let e = n.current;
			if (e !== l) {
				let t = e ? "controlled" : "uncontrolled", n = l ? "controlled" : "uncontrolled";
				console.warn(`${a} is changing from ${t} to ${n}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
			}
			n.current = l;
		}, [l, a]);
	}
	return [u, React$1.useCallback((e) => {
		if (l) {
			let n = isFunction(e) ? e(t) : e;
			n !== t && c.current?.(n);
		} else s(e);
	}, [
		l,
		t,
		s,
		c
	])];
}
function useUncontrolledState({ defaultProp: t, onChange: n }) {
	let [i, a] = React$1.useState(t), o = React$1.useRef(i), s = React$1.useRef(n);
	return useInsertionEffect(() => {
		s.current = n;
	}, [n]), React$1.useEffect(() => {
		o.current !== i && (s.current?.(i), o.current = i);
	}, [i, o]), [
		i,
		a,
		s
	];
}
function isFunction(e) {
	return typeof e == "function";
}
var POPOVER_NAME = "Popover", [createPopoverContext, createPopoverScope] = createContextScope(POPOVER_NAME, [createPopperScope]), usePopperScope = createPopperScope(), [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME), Popover = (t) => {
	let { __scopePopover: n, children: i, open: a, defaultOpen: o, onOpenChange: s, modal: c = !1 } = t, l = usePopperScope(n), u = React$1.useRef(null), [d, f] = React$1.useState(!1), [p, m] = useControllableState({
		prop: a,
		defaultProp: o ?? !1,
		onChange: s,
		caller: POPOVER_NAME
	});
	return /* @__PURE__ */ jsx(Root2$1, {
		...l,
		children: /* @__PURE__ */ jsx(PopoverProvider, {
			scope: n,
			contentId: useId$1(),
			triggerRef: u,
			open: p,
			onOpenChange: m,
			onOpenToggle: React$1.useCallback(() => m((e) => !e), [m]),
			hasCustomAnchor: d,
			onCustomAnchorAdd: React$1.useCallback(() => f(!0), []),
			onCustomAnchorRemove: React$1.useCallback(() => f(!1), []),
			modal: c,
			children: i
		})
	});
};
Popover.displayName = POPOVER_NAME;
var ANCHOR_NAME = "PopoverAnchor", PopoverAnchor = React$1.forwardRef((t, n) => {
	let { __scopePopover: i, ...a } = t, o = usePopoverContext(ANCHOR_NAME, i), s = usePopperScope(i), { onCustomAnchorAdd: c, onCustomAnchorRemove: l } = o;
	return React$1.useEffect(() => (c(), () => l()), [c, l]), /* @__PURE__ */ jsx(Anchor, {
		...s,
		...a,
		ref: n
	});
});
PopoverAnchor.displayName = ANCHOR_NAME;
var TRIGGER_NAME = "PopoverTrigger", PopoverTrigger = React$1.forwardRef((e, t) => {
	let { __scopePopover: n, ...i } = e, a = usePopoverContext(TRIGGER_NAME, n), o = usePopperScope(n), s = useComposedRefs(t, a.triggerRef), c = /* @__PURE__ */ jsx(Primitive.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": a.open,
		"aria-controls": a.open ? a.contentId : void 0,
		"data-state": getState(a.open),
		...i,
		ref: s,
		onClick: composeEventHandlers(e.onClick, a.onOpenToggle)
	});
	return a.hasCustomAnchor ? c : /* @__PURE__ */ jsx(Anchor, {
		asChild: !0,
		...o,
		children: c
	});
});
PopoverTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "PopoverPortal", [PortalProvider, usePortalContext] = createPopoverContext(PORTAL_NAME, { forceMount: void 0 }), PopoverPortal = (e) => {
	let { __scopePopover: t, forceMount: n, children: i, container: a } = e, o = usePopoverContext(PORTAL_NAME, t);
	return /* @__PURE__ */ jsx(PortalProvider, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ jsx(Presence, {
			present: n || o.open,
			children: /* @__PURE__ */ jsx(Portal, {
				asChild: !0,
				container: a,
				children: i
			})
		})
	});
};
PopoverPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "PopoverContent", PopoverContent = React$1.forwardRef((e, t) => {
	let n = usePortalContext(CONTENT_NAME, e.__scopePopover), { forceMount: i = n.forceMount, ...a } = e, o = usePopoverContext(CONTENT_NAME, e.__scopePopover);
	return /* @__PURE__ */ jsx(Presence, {
		present: i || o.open,
		children: o.modal ? /* @__PURE__ */ jsx(PopoverContentModal, {
			...a,
			ref: t
		}) : /* @__PURE__ */ jsx(PopoverContentNonModal, {
			...a,
			ref: t
		})
	});
});
PopoverContent.displayName = CONTENT_NAME;
var Slot = /* @__PURE__ */ createSlot("PopoverContent.RemoveScroll"), PopoverContentModal = React$1.forwardRef((t, n) => {
	let i = usePopoverContext(CONTENT_NAME, t.__scopePopover), a = React$1.useRef(null), o = useComposedRefs(n, a), s = React$1.useRef(!1);
	return React$1.useEffect(() => {
		let e = a.current;
		if (e) return hideOthers(e);
	}, []), /* @__PURE__ */ jsx(Combination_default, {
		as: Slot,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ jsx(PopoverContentImpl, {
			...t,
			ref: o,
			trapFocus: i.open,
			disableOutsidePointerEvents: !0,
			onCloseAutoFocus: composeEventHandlers(t.onCloseAutoFocus, (e) => {
				e.preventDefault(), s.current || i.triggerRef.current?.focus();
			}),
			onPointerDownOutside: composeEventHandlers(t.onPointerDownOutside, (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				s.current = t.button === 2 || n;
			}, { checkForDefaultPrevented: !1 }),
			onFocusOutside: composeEventHandlers(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 })
		})
	});
}), PopoverContentNonModal = React$1.forwardRef((t, n) => {
	let i = usePopoverContext(CONTENT_NAME, t.__scopePopover), a = React$1.useRef(!1), o = React$1.useRef(!1);
	return /* @__PURE__ */ jsx(PopoverContentImpl, {
		...t,
		ref: n,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (e) => {
			t.onCloseAutoFocus?.(e), e.defaultPrevented || (a.current || i.triggerRef.current?.focus(), e.preventDefault()), a.current = !1, o.current = !1;
		},
		onInteractOutside: (e) => {
			t.onInteractOutside?.(e), e.defaultPrevented || (a.current = !0, e.detail.originalEvent.type === "pointerdown" && (o.current = !0));
			let n = e.target;
			i.triggerRef.current?.contains(n) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && o.current && e.preventDefault();
		}
	});
}), PopoverContentImpl = React$1.forwardRef((e, t) => {
	let { __scopePopover: n, trapFocus: i, onOpenAutoFocus: a, onCloseAutoFocus: o, disableOutsidePointerEvents: s, onEscapeKeyDown: c, onPointerDownOutside: l, onFocusOutside: u, onInteractOutside: d, ...f } = e, p = usePopoverContext(CONTENT_NAME, n), m = usePopperScope(n);
	return useFocusGuards(), /* @__PURE__ */ jsx(FocusScope, {
		asChild: !0,
		loop: !0,
		trapped: i,
		onMountAutoFocus: a,
		onUnmountAutoFocus: o,
		children: /* @__PURE__ */ jsx(DismissableLayer, {
			asChild: !0,
			disableOutsidePointerEvents: s,
			onInteractOutside: d,
			onEscapeKeyDown: c,
			onPointerDownOutside: l,
			onFocusOutside: u,
			onDismiss: () => p.onOpenChange(!1),
			deferPointerDownOutside: !0,
			children: /* @__PURE__ */ jsx(Content, {
				"data-state": getState(p.open),
				role: "dialog",
				id: p.contentId,
				...m,
				...f,
				ref: t,
				style: {
					...f.style,
					"--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
					"--radix-popover-content-available-width": "var(--radix-popper-available-width)",
					"--radix-popover-content-available-height": "var(--radix-popper-available-height)",
					"--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
					"--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
				}
			})
		})
	});
}), CLOSE_NAME = "PopoverClose", PopoverClose = React$1.forwardRef((e, t) => {
	let { __scopePopover: n, ...i } = e, a = usePopoverContext(CLOSE_NAME, n);
	return /* @__PURE__ */ jsx(Primitive.button, {
		type: "button",
		...i,
		ref: t,
		onClick: composeEventHandlers(e.onClick, () => a.onOpenChange(!1))
	});
});
PopoverClose.displayName = CLOSE_NAME;
var ARROW_NAME = "PopoverArrow", PopoverArrow = React$1.forwardRef((e, t) => {
	let { __scopePopover: n, ...i } = e;
	return /* @__PURE__ */ jsx(Arrow, {
		...usePopperScope(n),
		...i,
		ref: t
	});
});
PopoverArrow.displayName = ARROW_NAME;
function getState(e) {
	return e ? "open" : "closed";
}
var Root2 = Popover, Trigger = PopoverTrigger, Portal$1 = PopoverPortal, Content2 = PopoverContent;
const millisecondsInWeek = 6048e5, secondsInDay = 3600 * 24;
secondsInDay * 7, secondsInDay * 365.2425;
const constructFromSymbol$1 = Symbol.for("constructDateFrom");
function constructFrom(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && constructFromSymbol$1 in e ? e[constructFromSymbol$1](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function toDate(e, t) {
	return constructFrom(t || e, e);
}
function addDays(e, t, n) {
	let i = toDate(e, n?.in);
	return isNaN(t) ? constructFrom(n?.in || e, NaN) : (t && i.setDate(i.getDate() + t), i);
}
function addMonths(e, t, n) {
	let i = toDate(e, n?.in);
	if (isNaN(t)) return constructFrom(n?.in || e, NaN);
	if (!t) return i;
	let a = i.getDate(), o = constructFrom(n?.in || e, i.getTime());
	return o.setMonth(i.getMonth() + t + 1, 0), a >= o.getDate() ? o : (i.setFullYear(o.getFullYear(), o.getMonth(), a), i);
}
var defaultOptions = {};
function getDefaultOptions() {
	return defaultOptions;
}
function startOfWeek(e, t) {
	let n = getDefaultOptions(), i = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, a = toDate(e, t?.in), o = a.getDay(), s = (o < i ? 7 : 0) + o - i;
	return a.setDate(a.getDate() - s), a.setHours(0, 0, 0, 0), a;
}
function startOfISOWeek(e, t) {
	return startOfWeek(e, {
		...t,
		weekStartsOn: 1
	});
}
function getISOWeekYear(e, t) {
	let n = toDate(e, t?.in), i = n.getFullYear(), a = constructFrom(n, 0);
	a.setFullYear(i + 1, 0, 4), a.setHours(0, 0, 0, 0);
	let o = startOfISOWeek(a), s = constructFrom(n, 0);
	s.setFullYear(i, 0, 4), s.setHours(0, 0, 0, 0);
	let c = startOfISOWeek(s);
	return n.getTime() >= o.getTime() ? i + 1 : n.getTime() >= c.getTime() ? i : i - 1;
}
function getTimezoneOffsetInMilliseconds(e) {
	let t = toDate(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
function normalizeDates(e, ...t) {
	let n = constructFrom.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
function startOfDay(e, t) {
	let n = toDate(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
function differenceInCalendarDays(e, t, n) {
	let [i, a] = normalizeDates(n?.in, e, t), o = startOfDay(i), s = startOfDay(a), c = +o - getTimezoneOffsetInMilliseconds(o), l = +s - getTimezoneOffsetInMilliseconds(s);
	return Math.round((c - l) / 864e5);
}
function startOfISOWeekYear(e, t) {
	let n = getISOWeekYear(e, t), i = constructFrom(t?.in || e, 0);
	return i.setFullYear(n, 0, 4), i.setHours(0, 0, 0, 0), startOfISOWeek(i);
}
function addWeeks(e, t, n) {
	return addDays(e, t * 7, n);
}
function addYears(e, t, n) {
	return addMonths(e, t * 12, n);
}
function max(e, t) {
	let n, i = t?.in;
	return e.forEach((e) => {
		!i && typeof e == "object" && (i = constructFrom.bind(null, e));
		let t = toDate(e, i);
		(!n || n < t || isNaN(+t)) && (n = t);
	}), constructFrom(i, n || NaN);
}
function min(e, t) {
	let n, i = t?.in;
	return e.forEach((e) => {
		!i && typeof e == "object" && (i = constructFrom.bind(null, e));
		let t = toDate(e, i);
		(!n || n > t || isNaN(+t)) && (n = t);
	}), constructFrom(i, n || NaN);
}
function isSameDay(e, t, n) {
	let [i, a] = normalizeDates(n?.in, e, t);
	return +startOfDay(i) == +startOfDay(a);
}
function isDate(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function isValid(e) {
	return !(!isDate(e) && typeof e != "number" || isNaN(+toDate(e)));
}
function differenceInCalendarMonths(e, t, n) {
	let [i, a] = normalizeDates(n?.in, e, t), o = i.getFullYear() - a.getFullYear(), s = i.getMonth() - a.getMonth();
	return o * 12 + s;
}
function endOfMonth(e, t) {
	let n = toDate(e, t?.in), i = n.getMonth();
	return n.setFullYear(n.getFullYear(), i + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function normalizeInterval(e, t) {
	let [n, i] = normalizeDates(e, t.start, t.end);
	return {
		start: n,
		end: i
	};
}
function eachMonthOfInterval(e, t) {
	let { start: n, end: i } = normalizeInterval(t?.in, e), a = +n > +i, o = a ? +n : +i, s = a ? i : n;
	s.setHours(0, 0, 0, 0), s.setDate(1);
	let c = t?.step ?? 1;
	if (!c) return [];
	c < 0 && (c = -c, a = !a);
	let l = [];
	for (; +s <= o;) l.push(constructFrom(n, s)), s.setMonth(s.getMonth() + c);
	return a ? l.reverse() : l;
}
function startOfMonth(e, t) {
	let n = toDate(e, t?.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function endOfYear(e, t) {
	let n = toDate(e, t?.in), i = n.getFullYear();
	return n.setFullYear(i + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function startOfYear(e, t) {
	let n = toDate(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function eachYearOfInterval(e, t) {
	let { start: n, end: i } = normalizeInterval(t?.in, e), a = +n > +i, o = a ? +n : +i, s = a ? i : n;
	s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
	let c = t?.step ?? 1;
	if (!c) return [];
	c < 0 && (c = -c, a = !a);
	let l = [];
	for (; +s <= o;) l.push(constructFrom(n, s)), s.setFullYear(s.getFullYear() + c);
	return a ? l.reverse() : l;
}
function endOfWeek(e, t) {
	let n = getDefaultOptions(), i = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, a = toDate(e, t?.in), o = a.getDay(), s = (o < i ? -7 : 0) + 6 - (o - i);
	return a.setDate(a.getDate() + s), a.setHours(23, 59, 59, 999), a;
}
function endOfISOWeek(e, t) {
	return endOfWeek(e, {
		...t,
		weekStartsOn: 1
	});
}
var formatDistanceLocale = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
};
const formatDistance = (e, t, n) => {
	let i, a = formatDistanceLocale[e];
	return i = typeof a == "string" ? a : t === 1 ? a.one : a.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + i : i + " ago" : i;
};
function buildFormatLongFn(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
const formatLong = {
	date: buildFormatLongFn({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: buildFormatLongFn({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: buildFormatLongFn({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
};
var formatRelativeLocale = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
};
const formatRelative = (e, t, n, i) => formatRelativeLocale[e];
function buildLocalizeFn(e) {
	return (t, n) => {
		let i = n?.context ? String(n.context) : "standalone", a;
		if (i === "formatting" && e.formattingValues) {
			let t = e.defaultFormattingWidth || e.defaultWidth, i = n?.width ? String(n.width) : t;
			a = e.formattingValues[i] || e.formattingValues[t];
		} else {
			let t = e.defaultWidth, i = n?.width ? String(n.width) : e.defaultWidth;
			a = e.values[i] || e.values[t];
		}
		let o = e.argumentCallback ? e.argumentCallback(t) : t;
		return a[o];
	};
}
const localize = {
	ordinalNumber: (e, t) => {
		let n = Number(e), i = n % 100;
		if (i > 20 || i < 10) switch (i % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: buildLocalizeFn({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: buildLocalizeFn({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4"
			],
			abbreviated: [
				"Q1",
				"Q2",
				"Q3",
				"Q4"
			],
			wide: [
				"1st quarter",
				"2nd quarter",
				"3rd quarter",
				"4th quarter"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: buildLocalizeFn({
		values: {
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		defaultWidth: "wide"
	}),
	day: buildLocalizeFn({
		values: {
			narrow: [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			],
			short: [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			],
			abbreviated: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			wide: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: buildLocalizeFn({
		values: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			}
		},
		defaultFormattingWidth: "wide"
	})
};
function buildMatchFn(e) {
	return (t, n = {}) => {
		let i = n.width, a = i && e.matchPatterns[i] || e.matchPatterns[e.defaultMatchWidth], o = t.match(a);
		if (!o) return null;
		let s = o[0], c = i && e.parsePatterns[i] || e.parsePatterns[e.defaultParseWidth], l = Array.isArray(c) ? findIndex(c, (e) => e.test(s)) : findKey(c, (e) => e.test(s)), u;
		u = e.valueCallback ? e.valueCallback(l) : l, u = n.valueCallback ? n.valueCallback(u) : u;
		let d = t.slice(s.length);
		return {
			value: u,
			rest: d
		};
	};
}
function findKey(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function findIndex(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
function buildMatchPatternFn(e) {
	return (t, n = {}) => {
		let i = t.match(e.matchPattern);
		if (!i) return null;
		let a = i[0], o = t.match(e.parsePattern);
		if (!o) return null;
		let s = e.valueCallback ? e.valueCallback(o[0]) : o[0];
		s = n.valueCallback ? n.valueCallback(s) : s;
		let c = t.slice(a.length);
		return {
			value: s,
			rest: c
		};
	};
}
const enUS$1 = {
	code: "en-US",
	formatDistance,
	formatLong,
	formatRelative,
	localize,
	match: {
		ordinalNumber: buildMatchPatternFn({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: buildMatchFn({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: buildMatchFn({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: buildMatchFn({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: buildMatchFn({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: buildMatchFn({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
function getDayOfYear(e, t) {
	let n = toDate(e, t?.in);
	return differenceInCalendarDays(n, startOfYear(n)) + 1;
}
function getISOWeek(e, t) {
	let n = toDate(e, t?.in), i = startOfISOWeek(n) - +startOfISOWeekYear(n);
	return Math.round(i / millisecondsInWeek) + 1;
}
function getWeekYear(e, t) {
	let n = toDate(e, t?.in), i = n.getFullYear(), a = getDefaultOptions(), o = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? a.firstWeekContainsDate ?? a.locale?.options?.firstWeekContainsDate ?? 1, s = constructFrom(t?.in || e, 0);
	s.setFullYear(i + 1, 0, o), s.setHours(0, 0, 0, 0);
	let c = startOfWeek(s, t), l = constructFrom(t?.in || e, 0);
	l.setFullYear(i, 0, o), l.setHours(0, 0, 0, 0);
	let u = startOfWeek(l, t);
	return +n >= +c ? i + 1 : +n >= +u ? i : i - 1;
}
function startOfWeekYear(e, t) {
	let n = getDefaultOptions(), i = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, a = getWeekYear(e, t), o = constructFrom(t?.in || e, 0);
	return o.setFullYear(a, 0, i), o.setHours(0, 0, 0, 0), startOfWeek(o, t);
}
function getWeek(e, t) {
	let n = toDate(e, t?.in), i = startOfWeek(n, t) - +startOfWeekYear(n, t);
	return Math.round(i / millisecondsInWeek) + 1;
}
function addLeadingZeros(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
const lightFormatters = {
	y(e, t) {
		let n = e.getFullYear(), i = n > 0 ? n : 1 - n;
		return addLeadingZeros(t === "yy" ? i % 100 : i, t.length);
	},
	M(e, t) {
		let n = e.getMonth();
		return t === "M" ? String(n + 1) : addLeadingZeros(n + 1, 2);
	},
	d(e, t) {
		return addLeadingZeros(e.getDate(), t.length);
	},
	a(e, t) {
		let n = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.toUpperCase();
			case "aaa": return n;
			case "aaaaa": return n[0];
			case "aaaa":
			default: return n === "am" ? "a.m." : "p.m.";
		}
	},
	h(e, t) {
		return addLeadingZeros(e.getHours() % 12 || 12, t.length);
	},
	H(e, t) {
		return addLeadingZeros(e.getHours(), t.length);
	},
	m(e, t) {
		return addLeadingZeros(e.getMinutes(), t.length);
	},
	s(e, t) {
		return addLeadingZeros(e.getSeconds(), t.length);
	},
	S(e, t) {
		let n = t.length, i = e.getMilliseconds();
		return addLeadingZeros(Math.trunc(i * 10 ** (n - 3)), t.length);
	}
};
var dayPeriodEnum = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
};
const formatters = {
	G: function(e, t, n) {
		let i = e.getFullYear() > 0 ? 1 : 0;
		switch (t) {
			case "G":
			case "GG":
			case "GGG": return n.era(i, { width: "abbreviated" });
			case "GGGGG": return n.era(i, { width: "narrow" });
			case "GGGG":
			default: return n.era(i, { width: "wide" });
		}
	},
	y: function(e, t, n) {
		if (t === "yo") {
			let t = e.getFullYear(), i = t > 0 ? t : 1 - t;
			return n.ordinalNumber(i, { unit: "year" });
		}
		return lightFormatters.y(e, t);
	},
	Y: function(e, t, n, i) {
		let a = getWeekYear(e, i), o = a > 0 ? a : 1 - a;
		return t === "YY" ? addLeadingZeros(o % 100, 2) : t === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : addLeadingZeros(o, t.length);
	},
	R: function(e, t) {
		return addLeadingZeros(getISOWeekYear(e), t.length);
	},
	u: function(e, t) {
		return addLeadingZeros(e.getFullYear(), t.length);
	},
	Q: function(e, t, n) {
		let i = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "Q": return String(i);
			case "QQ": return addLeadingZeros(i, 2);
			case "Qo": return n.ordinalNumber(i, { unit: "quarter" });
			case "QQQ": return n.quarter(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return n.quarter(i, {
				width: "narrow",
				context: "formatting"
			});
			case "QQQQ":
			default: return n.quarter(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(e, t, n) {
		let i = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "q": return String(i);
			case "qq": return addLeadingZeros(i, 2);
			case "qo": return n.ordinalNumber(i, { unit: "quarter" });
			case "qqq": return n.quarter(i, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return n.quarter(i, {
				width: "narrow",
				context: "standalone"
			});
			case "qqqq":
			default: return n.quarter(i, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(e, t, n) {
		let i = e.getMonth();
		switch (t) {
			case "M":
			case "MM": return lightFormatters.M(e, t);
			case "Mo": return n.ordinalNumber(i + 1, { unit: "month" });
			case "MMM": return n.month(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return n.month(i, {
				width: "narrow",
				context: "formatting"
			});
			case "MMMM":
			default: return n.month(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(e, t, n) {
		let i = e.getMonth();
		switch (t) {
			case "L": return String(i + 1);
			case "LL": return addLeadingZeros(i + 1, 2);
			case "Lo": return n.ordinalNumber(i + 1, { unit: "month" });
			case "LLL": return n.month(i, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return n.month(i, {
				width: "narrow",
				context: "standalone"
			});
			case "LLLL":
			default: return n.month(i, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(e, t, n, i) {
		let a = getWeek(e, i);
		return t === "wo" ? n.ordinalNumber(a, { unit: "week" }) : addLeadingZeros(a, t.length);
	},
	I: function(e, t, n) {
		let i = getISOWeek(e);
		return t === "Io" ? n.ordinalNumber(i, { unit: "week" }) : addLeadingZeros(i, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : lightFormatters.d(e, t);
	},
	D: function(e, t, n) {
		let i = getDayOfYear(e);
		return t === "Do" ? n.ordinalNumber(i, { unit: "dayOfYear" }) : addLeadingZeros(i, t.length);
	},
	E: function(e, t, n) {
		let i = e.getDay();
		switch (t) {
			case "E":
			case "EE":
			case "EEE": return n.day(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return n.day(i, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return n.day(i, {
				width: "short",
				context: "formatting"
			});
			case "EEEE":
			default: return n.day(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(e, t, n, i) {
		let a = e.getDay(), o = (a - i.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "e": return String(o);
			case "ee": return addLeadingZeros(o, 2);
			case "eo": return n.ordinalNumber(o, { unit: "day" });
			case "eee": return n.day(a, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return n.day(a, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return n.day(a, {
				width: "short",
				context: "formatting"
			});
			case "eeee":
			default: return n.day(a, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(e, t, n, i) {
		let a = e.getDay(), o = (a - i.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "c": return String(o);
			case "cc": return addLeadingZeros(o, t.length);
			case "co": return n.ordinalNumber(o, { unit: "day" });
			case "ccc": return n.day(a, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return n.day(a, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return n.day(a, {
				width: "short",
				context: "standalone"
			});
			case "cccc":
			default: return n.day(a, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(e, t, n) {
		let i = e.getDay(), a = i === 0 ? 7 : i;
		switch (t) {
			case "i": return String(a);
			case "ii": return addLeadingZeros(a, t.length);
			case "io": return n.ordinalNumber(a, { unit: "day" });
			case "iii": return n.day(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return n.day(i, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return n.day(i, {
				width: "short",
				context: "formatting"
			});
			case "iiii":
			default: return n.day(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(e, t, n) {
		let i = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			case "aaaa":
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(e, t, n) {
		let i = e.getHours(), a;
		switch (a = i === 12 ? dayPeriodEnum.noon : i === 0 ? dayPeriodEnum.midnight : i / 12 >= 1 ? "pm" : "am", t) {
			case "b":
			case "bb": return n.dayPeriod(a, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return n.dayPeriod(a, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return n.dayPeriod(a, {
				width: "narrow",
				context: "formatting"
			});
			case "bbbb":
			default: return n.dayPeriod(a, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(e, t, n) {
		let i = e.getHours(), a;
		switch (a = i >= 17 ? dayPeriodEnum.evening : i >= 12 ? dayPeriodEnum.afternoon : i >= 4 ? dayPeriodEnum.morning : dayPeriodEnum.night, t) {
			case "B":
			case "BB":
			case "BBB": return n.dayPeriod(a, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return n.dayPeriod(a, {
				width: "narrow",
				context: "formatting"
			});
			case "BBBB":
			default: return n.dayPeriod(a, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(e, t, n) {
		if (t === "ho") {
			let t = e.getHours() % 12;
			return t === 0 && (t = 12), n.ordinalNumber(t, { unit: "hour" });
		}
		return lightFormatters.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : lightFormatters.H(e, t);
	},
	K: function(e, t, n) {
		let i = e.getHours() % 12;
		return t === "Ko" ? n.ordinalNumber(i, { unit: "hour" }) : addLeadingZeros(i, t.length);
	},
	k: function(e, t, n) {
		let i = e.getHours();
		return i === 0 && (i = 24), t === "ko" ? n.ordinalNumber(i, { unit: "hour" }) : addLeadingZeros(i, t.length);
	},
	m: function(e, t, n) {
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : lightFormatters.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : lightFormatters.s(e, t);
	},
	S: function(e, t) {
		return lightFormatters.S(e, t);
	},
	X: function(e, t, n) {
		let i = e.getTimezoneOffset();
		if (i === 0) return "Z";
		switch (t) {
			case "X": return formatTimezoneWithOptionalMinutes(i);
			case "XXXX":
			case "XX": return formatTimezone(i);
			case "XXXXX":
			case "XXX":
			default: return formatTimezone(i, ":");
		}
	},
	x: function(e, t, n) {
		let i = e.getTimezoneOffset();
		switch (t) {
			case "x": return formatTimezoneWithOptionalMinutes(i);
			case "xxxx":
			case "xx": return formatTimezone(i);
			case "xxxxx":
			case "xxx":
			default: return formatTimezone(i, ":");
		}
	},
	O: function(e, t, n) {
		let i = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + formatTimezoneShort(i, ":");
			case "OOOO":
			default: return "GMT" + formatTimezone(i, ":");
		}
	},
	z: function(e, t, n) {
		let i = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + formatTimezoneShort(i, ":");
			case "zzzz":
			default: return "GMT" + formatTimezone(i, ":");
		}
	},
	t: function(e, t, n) {
		return addLeadingZeros(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return addLeadingZeros(+e, t.length);
	}
};
function formatTimezoneShort(e, t = "") {
	let n = e > 0 ? "-" : "+", i = Math.abs(e), a = Math.trunc(i / 60), o = i % 60;
	return o === 0 ? n + String(a) : n + String(a) + t + addLeadingZeros(o, 2);
}
function formatTimezoneWithOptionalMinutes(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + addLeadingZeros(Math.abs(e) / 60, 2) : formatTimezone(e, t);
}
function formatTimezone(e, t = "") {
	let n = e > 0 ? "-" : "+", i = Math.abs(e), a = addLeadingZeros(Math.trunc(i / 60), 2), o = addLeadingZeros(i % 60, 2);
	return n + a + t + o;
}
var dateLongFormatter = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		case "PPPP":
		default: return t.date({ width: "full" });
	}
}, timeLongFormatter = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		case "pppp":
		default: return t.time({ width: "full" });
	}
};
const longFormatters = {
	p: timeLongFormatter,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], i = n[1], a = n[2];
		if (!a) return dateLongFormatter(e, t);
		let o;
		switch (i) {
			case "P":
				o = t.dateTime({ width: "short" });
				break;
			case "PP":
				o = t.dateTime({ width: "medium" });
				break;
			case "PPP":
				o = t.dateTime({ width: "long" });
				break;
			case "PPPP":
			default:
				o = t.dateTime({ width: "full" });
				break;
		}
		return o.replace("{{date}}", dateLongFormatter(i, t)).replace("{{time}}", timeLongFormatter(a, t));
	}
};
var dayOfYearTokenRE = /^D+$/, weekYearTokenRE = /^Y+$/, throwTokens = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function isProtectedDayOfYearToken(e) {
	return dayOfYearTokenRE.test(e);
}
function isProtectedWeekYearToken(e) {
	return weekYearTokenRE.test(e);
}
function warnOrThrowProtectedError(e, t, n) {
	let i = message(e, t, n);
	if (console.warn(i), throwTokens.includes(e)) throw RangeError(i);
}
function message(e, t, n) {
	let i = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${i} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, escapedStringRegExp = /^'([^]*?)'?$/, doubleQuoteRegExp = /''/g, unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(e, t, n) {
	let i = getDefaultOptions(), a = n?.locale ?? i.locale ?? enUS$1, o = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, s = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? i.weekStartsOn ?? i.locale?.options?.weekStartsOn ?? 0, c = toDate(e, n?.in);
	if (!isValid(c)) throw RangeError("Invalid time value");
	let l = t.match(longFormattingTokensRegExp).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = longFormatters[t];
			return n(e, a.formatLong);
		}
		return e;
	}).join("").match(formattingTokensRegExp).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: cleanEscapedString(e)
		};
		if (formatters[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(unescapedLatinCharacterRegExp)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
		return {
			isToken: !1,
			value: e
		};
	});
	a.localize.preprocessor && (l = a.localize.preprocessor(c, l));
	let u = {
		firstWeekContainsDate: o,
		weekStartsOn: s,
		locale: a
	};
	return l.map((i) => {
		if (!i.isToken) return i.value;
		let o = i.value;
		(!n?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(o) || !n?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(o)) && warnOrThrowProtectedError(o, t, String(e));
		let s = formatters[o[0]];
		return s(c, o, a.localize, u);
	}).join("");
}
function cleanEscapedString(e) {
	let t = e.match(escapedStringRegExp);
	return t ? t[1].replace(doubleQuoteRegExp, "'") : e;
}
function getDaysInMonth(e, t) {
	let n = toDate(e, t?.in), i = n.getFullYear(), a = n.getMonth(), o = constructFrom(n, 0);
	return o.setFullYear(i, a + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
}
function getMonth(e, t) {
	return toDate(e, t?.in).getMonth();
}
function getYear(e, t) {
	return toDate(e, t?.in).getFullYear();
}
function isAfter(e, t) {
	return +toDate(e) > +toDate(t);
}
function isBefore(e, t) {
	return +toDate(e) < +toDate(t);
}
function isSameMonth(e, t, n) {
	let [i, a] = normalizeDates(n?.in, e, t);
	return i.getFullYear() === a.getFullYear() && i.getMonth() === a.getMonth();
}
function isSameYear(e, t, n) {
	let [i, a] = normalizeDates(n?.in, e, t);
	return i.getFullYear() === a.getFullYear();
}
function setMonth(e, t, n) {
	let i = toDate(e, n?.in), a = i.getFullYear(), o = i.getDate(), s = constructFrom(n?.in || e, 0);
	s.setFullYear(a, t, 15), s.setHours(0, 0, 0, 0);
	let c = getDaysInMonth(s);
	return i.setMonth(t, Math.min(o, c)), i;
}
function setYear(e, t, n) {
	let i = toDate(e, n?.in);
	return isNaN(+i) ? constructFrom(n?.in || e, NaN) : (i.setFullYear(t), i);
}
function tzName(e, t, n = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: e,
		timeZoneName: n
	}).format(t).split(/\s/g).slice(2).join(" ");
}
var offsetFormatCache = {}, offsetCache = {};
function tzOffset(e, t) {
	try {
		let n = (offsetFormatCache[e] ||= new Intl.DateTimeFormat("en-US", {
			timeZone: e,
			timeZoneName: "longOffset"
		}).format)(t).split("GMT")[1];
		return n in offsetCache ? offsetCache[n] : calcOffset(n, n.split(":"));
	} catch {
		if (e in offsetCache) return offsetCache[e];
		let t = e?.match(offsetRe);
		return t ? calcOffset(e, t.slice(1)) : NaN;
	}
}
var offsetRe = /([+-]\d\d):?(\d\d)?/;
function calcOffset(e, t) {
	let n = +(t[0] || 0), i = +(t[1] || 0), a = (t[2] || 0) / 60;
	return offsetCache[e] = n * 60 + i > 0 ? n * 60 + i + a : n * 60 - i - a;
}
var TZDateMini = class e extends Date {
	constructor(...e) {
		super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(tzOffset(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), adjustToSystemTZ(this, e)) : this.setTime(Date.now());
	}
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	getTimezoneOffset() {
		let e = -tzOffset(this.timeZone, this);
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), syncToInternal(this), +this;
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, re = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
	if (!re.test(e)) return;
	let t = e.replace(re, "$1UTC");
	TZDateMini.prototype[t] && (e.startsWith("get") ? TZDateMini.prototype[e] = function() {
		return this.internal[t]();
	} : (TZDateMini.prototype[e] = function() {
		return Date.prototype[t].apply(this.internal, arguments), syncFromInternal(this), +this;
	}, TZDateMini.prototype[t] = function() {
		return Date.prototype[t].apply(this, arguments), syncToInternal(this), +this;
	}));
});
function syncToInternal(e) {
	e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-tzOffset(e.timeZone, e) * 60));
}
function syncFromInternal(e) {
	Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), adjustToSystemTZ(e);
}
function adjustToSystemTZ(e, t) {
	let n = Array.isArray(t) ? constructorArgsToInternalTime(t) : +e.internal, i = tzOffset(e.timeZone, e), a = i > 0 ? Math.floor(i) : Math.ceil(i), o = /* @__PURE__ */ new Date(+e);
	o.setUTCHours(o.getUTCHours() - 1);
	let s = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), c = -(/* @__PURE__ */ new Date(+o)).getTimezoneOffset(), l = s - c, u = s;
	if (l && s !== a && Date.prototype.getHours.apply(e) !== (Array.isArray(t) ? t[3] || 0 : e.internal.getUTCHours())) {
		let t = /* @__PURE__ */ new Date(+e), n = s - a;
		n && t.setUTCMinutes(t.getUTCMinutes() + n);
		let i = tzOffset(e.timeZone, t);
		(i > 0 ? Math.floor(i) : Math.ceil(i)) === a && (u = c);
	}
	let d = u - a;
	d && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + d);
	let f = /* @__PURE__ */ new Date(+e);
	f.setUTCSeconds(0);
	let p = s > 0 ? f.getSeconds() : (f.getSeconds() - 60) % 60, m = Math.round(-(tzOffset(e.timeZone, e) * 60)) % 60;
	(m || p) && Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + m + p);
	let h = tzOffset(e.timeZone, e), g = h > 0 ? Math.floor(h) : Math.ceil(h), _ = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - g, v = g !== a, y = _ - d, b = g - a, x = n - g * 60 * 1e3, S = b > 0 && targetInternalTime(e) - n === b * 60 * 1e3 && targetInternalTime(e, x) !== n;
	if (v && y && !S) {
		Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + y);
		let t = tzOffset(e.timeZone, e), n = g - (t > 0 ? Math.floor(t) : Math.ceil(t));
		n && y < 0 && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n);
	}
	syncToInternal(e);
	let C = (t ? n : n + m * 1e3) - +e.internal;
	C && Math.abs(C) < 1800 * 1e3 && (Date.prototype.setTime.call(e, +e + C), syncToInternal(e));
}
function constructorArgsToInternalTime(e) {
	return Date.UTC(e[0], e.length > 1 ? e[1] : 0, e.length > 2 ? e[2] : 1, ...e.slice(3));
}
function targetInternalTime(e, t) {
	let n = new Date(t ?? +e);
	return n.setUTCSeconds(n.getUTCSeconds() - Math.round(-tzOffset(e.timeZone, n) * 60)), +n;
}
var TZDate = class e extends TZDateMini {
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	toISOString() {
		let [e, t, n] = this.tzComponents(), i = `${e}${t}:${n}`;
		return this.internal.toISOString().slice(0, -1) + i;
	}
	toString() {
		return `${this.toDateString()} ${this.toTimeString()}`;
	}
	toDateString() {
		let [e, t, n, i] = this.internal.toUTCString().split(" ");
		return `${e?.slice(0, -1)} ${n} ${t} ${i}`;
	}
	toTimeString() {
		let e = this.internal.toUTCString().split(" ")[4], [t, n, i] = this.tzComponents();
		return `${e} GMT${t}${n}${i} (${tzName(this.timeZone, this)})`;
	}
	toLocaleString(e, t) {
		return Date.prototype.toLocaleString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleDateString(e, t) {
		return Date.prototype.toLocaleDateString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleTimeString(e, t) {
		return Date.prototype.toLocaleTimeString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	tzComponents() {
		let e = this.getTimezoneOffset();
		return [
			e > 0 ? "-" : "+",
			String(Math.floor(Math.abs(e) / 60)).padStart(2, "0"),
			String(Math.abs(e) % 60).padStart(2, "0")
		];
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, FIVE_WEEKS = 5, FOUR_WEEKS = 4;
function getBroadcastWeeksInMonth(e, t) {
	let n = t.startOfMonth(e), i = n.getDay() > 0 ? n.getDay() : 7, a = t.addDays(e, -i + 1), o = t.addDays(a, FIVE_WEEKS * 7 - 1);
	return t.getMonth(e) === t.getMonth(o) ? FIVE_WEEKS : FOUR_WEEKS;
}
function startOfBroadcastWeek(e, t) {
	let n = t.startOfMonth(e), i = n.getDay();
	return i === 1 ? n : i === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (i - 1));
}
function endOfBroadcastWeek(e, t) {
	let n = startOfBroadcastWeek(e, t), i = getBroadcastWeeksInMonth(e, t);
	return t.addDays(n, i * 7 - 1);
}
const enUS = {
	...enUS$1,
	labels: {
		labelDayButton: (e, t, n, i) => {
			let a;
			a = i && typeof i.format == "function" ? i.format.bind(i) : (e, t) => format(e, t, {
				locale: enUS$1,
				...n
			});
			let o = a(e, "PPPP");
			return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (e) => `Week ${e}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (e, t, n) => {
			let i;
			return i = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => format(e, n, {
				locale: enUS$1,
				...t
			}), i(e, "LLLL yyyy");
		},
		labelGridcell: (e, t, n, i) => {
			let a;
			a = i && typeof i.format == "function" ? i.format.bind(i) : (e, t) => format(e, t, {
				locale: enUS$1,
				...n
			});
			let o = a(e, "PPPP");
			return t?.today && (o = `Today, ${o}`), o;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (e, t, n) => {
			let i;
			return i = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => format(e, n, {
				locale: enUS$1,
				...t
			}), i(e, "cccc");
		}
	}
};
var DateLib = class e {
	constructor(e, t) {
		this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? TZDate.tz(this.options.timeZone) : new (this.options.Date ?? Date)(), this.newDate = (e, t, n) => this.overrides?.newDate ? this.overrides.newDate(e, t, n) : this.options.timeZone ? new TZDate(e, t, n, this.options.timeZone) : new Date(e, t, n), this.addDays = (e, t) => this.overrides?.addDays ? this.overrides.addDays(e, t) : addDays(e, t), this.addMonths = (e, t) => this.overrides?.addMonths ? this.overrides.addMonths(e, t) : addMonths(e, t), this.addWeeks = (e, t) => this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : addWeeks(e, t), this.addYears = (e, t) => this.overrides?.addYears ? this.overrides.addYears(e, t) : addYears(e, t), this.differenceInCalendarDays = (e, t) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(e, t) : differenceInCalendarDays(e, t), this.differenceInCalendarMonths = (e, t) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(e, t) : differenceInCalendarMonths(e, t), this.eachMonthOfInterval = (e) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : eachMonthOfInterval(e), this.eachYearOfInterval = (e) => {
			let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : eachYearOfInterval(e), n = new Set(t.map((e) => this.getYear(e)));
			if (n.size === t.length) return t;
			let i = [];
			return n.forEach((e) => {
				i.push(new Date(e, 0, 1));
			}), i;
		}, this.endOfBroadcastWeek = (e) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : endOfBroadcastWeek(e, this), this.endOfISOWeek = (e) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : endOfISOWeek(e), this.endOfMonth = (e) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : endOfMonth(e), this.endOfWeek = (e, t) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : endOfWeek(e, this.options), this.endOfYear = (e) => this.overrides?.endOfYear ? this.overrides.endOfYear(e) : endOfYear(e), this.format = (e, t, n) => {
			let i = this.overrides?.format ? this.overrides.format(e, t, this.options) : format(e, t, this.options);
			return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
		}, this.getISOWeek = (e) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : getISOWeek(e), this.getMonth = (e, t) => this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : getMonth(e, this.options), this.getYear = (e, t) => this.overrides?.getYear ? this.overrides.getYear(e, this.options) : getYear(e, this.options), this.getWeek = (e, t) => this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : getWeek(e, this.options), this.isAfter = (e, t) => this.overrides?.isAfter ? this.overrides.isAfter(e, t) : isAfter(e, t), this.isBefore = (e, t) => this.overrides?.isBefore ? this.overrides.isBefore(e, t) : isBefore(e, t), this.isDate = (e) => this.overrides?.isDate ? this.overrides.isDate(e) : isDate(e), this.isSameDay = (e, t) => this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : isSameDay(e, t), this.isSameMonth = (e, t) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : isSameMonth(e, t), this.isSameYear = (e, t) => this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : isSameYear(e, t), this.max = (e) => this.overrides?.max ? this.overrides.max(e) : max(e), this.min = (e) => this.overrides?.min ? this.overrides.min(e) : min(e), this.setMonth = (e, t) => this.overrides?.setMonth ? this.overrides.setMonth(e, t) : setMonth(e, t), this.setYear = (e, t) => this.overrides?.setYear ? this.overrides.setYear(e, t) : setYear(e, t), this.startOfBroadcastWeek = (e, t) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(e, this) : startOfBroadcastWeek(e, this), this.startOfDay = (e) => this.overrides?.startOfDay ? this.overrides.startOfDay(e) : startOfDay(e), this.startOfISOWeek = (e) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : startOfISOWeek(e), this.startOfMonth = (e) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : startOfMonth(e), this.startOfWeek = (e, t) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(e, this.options) : startOfWeek(e, this.options), this.startOfYear = (e) => this.overrides?.startOfYear ? this.overrides.startOfYear(e) : startOfYear(e), this.options = {
			locale: enUS,
			...e
		}, this.overrides = t;
	}
	getDigitMap() {
		let { numerals: e = "latn" } = this.options, t = new Intl.NumberFormat("en-US", { numberingSystem: e }), n = {};
		for (let e = 0; e < 10; e++) n[e.toString()] = t.format(e);
		return n;
	}
	replaceDigits(e) {
		let t = this.getDigitMap();
		return e.replace(/\d/g, (e) => t[e] || e);
	}
	formatNumber(e) {
		return this.replaceDigits(e.toString());
	}
	getMonthYearOrder() {
		let t = this.options.locale?.code;
		return t && e.yearFirstLocales.has(t) ? "year-first" : "month-first";
	}
	formatMonthYear(t) {
		let { locale: n, timeZone: i, numerals: a } = this.options, o = n?.code;
		if (o && e.yearFirstLocales.has(o)) try {
			return new Intl.DateTimeFormat(o, {
				month: "long",
				year: "numeric",
				timeZone: i,
				numberingSystem: a
			}).format(t);
		} catch {}
		let s = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
		return this.format(t, s);
	}
};
DateLib.yearFirstLocales = new Set([
	"eu",
	"hu",
	"ja",
	"ja-Hira",
	"ja-JP",
	"ko",
	"ko-KR",
	"lt",
	"lt-LT",
	"lv",
	"lv-LV",
	"mn",
	"mn-MN",
	"zh",
	"zh-CN",
	"zh-HK",
	"zh-TW"
]);
const defaultDateLib = new DateLib();
var CalendarDay = class {
	constructor(e, t, n = defaultDateLib) {
		this.date = e, this.displayMonth = t, this.outside = !!(t && !n.isSameMonth(e, t)), this.dateLib = n, this.isoDate = n.format(e, "yyyy-MM-dd"), this.displayMonthId = n.format(t, "yyyy-MM"), this.dateMonthId = n.format(e, "yyyy-MM");
	}
	isEqualTo(e) {
		return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
	}
}, CalendarMonth = class {
	constructor(e, t) {
		this.date = e, this.weeks = t;
	}
}, CalendarWeek = class {
	constructor(e, t) {
		this.days = t, this.weekNumber = e;
	}
};
function CaptionLabel(e) {
	return React.createElement("span", { ...e });
}
function Chevron(e) {
	let { size: n = 24, orientation: i = "left", className: a, style: o } = e;
	return React.createElement("svg", {
		className: a,
		style: o,
		width: n,
		height: n,
		viewBox: "0 0 24 24"
	}, i === "up" && React.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }), i === "down" && React.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }), i === "left" && React.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }), i === "right" && React.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" }));
}
function Day(e) {
	let { day: n, modifiers: i, ...a } = e;
	return React.createElement("td", { ...a });
}
function DayButton(e) {
	let { day: n, modifiers: i, ...a } = e, o = React.useRef(null);
	return React.useEffect(() => {
		i.focused && o.current?.focus();
	}, [i.focused]), React.createElement("button", {
		ref: o,
		...a
	});
}
var UI;
(function(e) {
	e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(UI ||= {});
var DayFlag;
(function(e) {
	e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(DayFlag ||= {});
var SelectionState;
(function(e) {
	e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(SelectionState ||= {});
var Animation;
(function(e) {
	e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Animation ||= {});
const dayPickerContext = createContext(void 0);
function useDayPicker() {
	let e = useContext(dayPickerContext);
	if (e === void 0) throw Error("useDayPicker() must be used within a custom component.");
	return e;
}
function Dropdown(e) {
	let { options: n, className: i, ...a } = e, { classNames: o, components: s, styles: c } = useDayPicker(), l = [o[UI.Dropdown], i].join(" "), u = n?.find(({ value: e }) => e === a.value);
	return React.createElement("span", {
		"data-disabled": a.disabled,
		className: o[UI.DropdownRoot],
		style: c?.[UI.DropdownRoot]
	}, React.createElement(s.Select, {
		className: l,
		...a
	}, n?.map(({ value: e, label: n, disabled: i }) => React.createElement(s.Option, {
		key: e,
		value: e,
		disabled: i
	}, n))), React.createElement("span", {
		className: o[UI.CaptionLabel],
		style: c?.[UI.CaptionLabel],
		"aria-hidden": !0
	}, u?.label, React.createElement(s.Chevron, {
		orientation: "down",
		size: 18,
		className: o[UI.Chevron],
		style: c?.[UI.Chevron]
	})));
}
function DropdownNav(e) {
	return React.createElement("div", { ...e });
}
function Footer(e) {
	return React.createElement("div", { ...e });
}
function Month(e) {
	let { calendarMonth: n, displayIndex: i, ...a } = e;
	return React.createElement("div", { ...a }, e.children);
}
function MonthCaption(e) {
	let { calendarMonth: n, displayIndex: i, ...a } = e;
	return React.createElement("div", { ...a });
}
function MonthGrid(e) {
	return React.createElement("table", { ...e });
}
function Months(e) {
	return React.createElement("div", { ...e });
}
function MonthsDropdown(e) {
	let { components: n } = useDayPicker();
	return React.createElement(n.Dropdown, { ...e });
}
function Nav(e) {
	let { onPreviousClick: n, onNextClick: i, previousMonth: a, nextMonth: s, ...c } = e, { components: l, classNames: u, styles: d, labels: { labelPrevious: f, labelNext: p } } = useDayPicker(), m = useCallback((e) => {
		s && i?.(e);
	}, [s, i]), h = useCallback((e) => {
		a && n?.(e);
	}, [a, n]);
	return React.createElement("nav", { ...c }, React.createElement(l.PreviousMonthButton, {
		type: "button",
		className: u[UI.PreviousMonthButton],
		style: d?.[UI.PreviousMonthButton],
		tabIndex: a ? void 0 : -1,
		"aria-disabled": a ? void 0 : !0,
		"aria-label": f(a),
		onClick: h
	}, React.createElement(l.Chevron, {
		disabled: a ? void 0 : !0,
		className: u[UI.Chevron],
		style: d?.[UI.Chevron],
		orientation: "left"
	})), React.createElement(l.NextMonthButton, {
		type: "button",
		className: u[UI.NextMonthButton],
		style: d?.[UI.NextMonthButton],
		tabIndex: s ? void 0 : -1,
		"aria-disabled": s ? void 0 : !0,
		"aria-label": p(s),
		onClick: m
	}, React.createElement(l.Chevron, {
		disabled: s ? void 0 : !0,
		orientation: "right",
		className: u[UI.Chevron],
		style: d?.[UI.Chevron]
	})));
}
function NextMonthButton(e) {
	return React.createElement("button", { ...e });
}
function Option(e) {
	return React.createElement("option", { ...e });
}
function PreviousMonthButton(e) {
	return React.createElement("button", { ...e });
}
function Root(e) {
	let { rootRef: n, ...i } = e;
	return React.createElement("div", {
		...i,
		ref: n
	});
}
function Select$1(e) {
	return React.createElement("select", { ...e });
}
function Week(e) {
	let { week: n, ...i } = e;
	return React.createElement("tr", { ...i });
}
function Weekday(e) {
	return React.createElement("th", { ...e });
}
function Weekdays(e) {
	return React.createElement("thead", { "aria-hidden": !0 }, React.createElement("tr", { ...e }));
}
function WeekNumber(e) {
	let { week: n, ...i } = e;
	return React.createElement("th", { ...i });
}
function WeekNumberHeader(e) {
	return React.createElement("th", { ...e });
}
function Weeks(e) {
	return React.createElement("tbody", { ...e });
}
function YearsDropdown(e) {
	let { components: n } = useDayPicker();
	return React.createElement(n.Dropdown, { ...e });
}
var custom_components_exports = /* @__PURE__ */ __export({
	CaptionLabel: () => CaptionLabel,
	Chevron: () => Chevron,
	Day: () => Day,
	DayButton: () => DayButton,
	Dropdown: () => Dropdown,
	DropdownNav: () => DropdownNav,
	Footer: () => Footer,
	Month: () => Month,
	MonthCaption: () => MonthCaption,
	MonthGrid: () => MonthGrid,
	Months: () => Months,
	MonthsDropdown: () => MonthsDropdown,
	Nav: () => Nav,
	NextMonthButton: () => NextMonthButton,
	Option: () => Option,
	PreviousMonthButton: () => PreviousMonthButton,
	Root: () => Root,
	Select: () => Select$1,
	Week: () => Week,
	WeekNumber: () => WeekNumber,
	WeekNumberHeader: () => WeekNumberHeader,
	Weekday: () => Weekday,
	Weekdays: () => Weekdays,
	Weeks: () => Weeks,
	YearsDropdown: () => YearsDropdown
});
function rangeIncludesDate(e, t, n = !1, i = defaultDateLib) {
	let { from: a, to: o } = e, { differenceInCalendarDays: s, isSameDay: c } = i;
	return a && o ? (s(o, a) < 0 && ([a, o] = [o, a]), s(t, a) >= (n ? 1 : 0) && s(o, t) >= (n ? 1 : 0)) : !n && o ? c(o, t) : !n && a ? c(a, t) : !1;
}
function isDateInterval(e) {
	return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function isDateRange(e) {
	return !!(e && typeof e == "object" && "from" in e);
}
function isDateAfterType(e) {
	return !!(e && typeof e == "object" && "after" in e);
}
function isDateBeforeType(e) {
	return !!(e && typeof e == "object" && "before" in e);
}
function isDayOfWeekType(e) {
	return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function isDatesArray(e, t) {
	return Array.isArray(e) && e.every(t.isDate);
}
function dateMatchModifiers(e, t, n = defaultDateLib) {
	let i = Array.isArray(t) ? t : [t], { isSameDay: a, differenceInCalendarDays: o, isAfter: s } = n;
	return i.some((t) => {
		if (typeof t == "boolean") return t;
		if (n.isDate(t)) return a(e, t);
		if (isDatesArray(t, n)) return t.some((t) => a(e, t));
		if (isDateRange(t)) return rangeIncludesDate(t, e, !1, n);
		if (isDayOfWeekType(t)) return Array.isArray(t.dayOfWeek) ? t.dayOfWeek.includes(e.getDay()) : t.dayOfWeek === e.getDay();
		if (isDateInterval(t)) {
			let n = o(t.before, e), i = o(t.after, e), a = n > 0, c = i < 0;
			return s(t.before, t.after) ? c && a : a || c;
		}
		return isDateAfterType(t) ? o(e, t.after) > 0 : isDateBeforeType(t) ? o(t.before, e) > 0 : typeof t == "function" ? t(e) : !1;
	});
}
function createGetModifiers(e, t, n, i, a) {
	let { disabled: o, hidden: s, modifiers: c, showOutsideDays: l, broadcastCalendar: u, today: d = a.today() } = t, { isSameDay: f, isSameMonth: p, startOfMonth: m, isBefore: h, endOfMonth: g, isAfter: _ } = a, v = n && m(n), y = i && g(i), b = {
		[DayFlag.focused]: [],
		[DayFlag.outside]: [],
		[DayFlag.disabled]: [],
		[DayFlag.hidden]: [],
		[DayFlag.today]: []
	}, x = {};
	for (let t of e) {
		let { date: e, displayMonth: n } = t, i = !!(n && !p(e, n)), m = !!(v && h(e, v)), g = !!(y && _(e, y)), S = !!(o && dateMatchModifiers(e, o, a)), C = !!(s && dateMatchModifiers(e, s, a)) || m || g || !u && !l && i || u && l === !1 && i, w = f(e, d);
		i && b.outside.push(t), S && b.disabled.push(t), C && b.hidden.push(t), w && b.today.push(t), c && Object.keys(c).forEach((n) => {
			let i = c?.[n];
			i && dateMatchModifiers(e, i, a) && (x[n] ? x[n].push(t) : x[n] = [t]);
		});
	}
	return (e) => {
		let t = {
			[DayFlag.focused]: !1,
			[DayFlag.disabled]: !1,
			[DayFlag.hidden]: !1,
			[DayFlag.outside]: !1,
			[DayFlag.today]: !1
		}, n = {};
		for (let n in b) t[n] = b[n].some((t) => t === e);
		for (let t in x) n[t] = x[t].some((t) => t === e);
		return {
			...t,
			...n
		};
	};
}
function getClassNamesForModifiers(e, t, n = {}) {
	return Object.entries(e).filter(([, e]) => e === !0).reduce((e, [i]) => (n[i] ? e.push(n[i]) : t[DayFlag[i]] ? e.push(t[DayFlag[i]]) : t[SelectionState[i]] && e.push(t[SelectionState[i]]), e), [t[UI.Day]]);
}
function getComponents(e) {
	return {
		...custom_components_exports,
		...e
	};
}
function getDataAttributes(e) {
	let t = {
		"data-mode": e.mode ?? void 0,
		"data-required": "required" in e ? e.required : void 0,
		"data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
		"data-week-numbers": e.showWeekNumber || void 0,
		"data-broadcast-calendar": e.broadcastCalendar || void 0,
		"data-nav-layout": e.navLayout || void 0
	};
	return Object.entries(e).forEach(([e, n]) => {
		e.startsWith("data-") && (t[e] = n);
	}), t;
}
function getDefaultClassNames() {
	let e = {};
	for (let t in UI) e[UI[t]] = `rdp-${UI[t]}`;
	for (let t in DayFlag) e[DayFlag[t]] = `rdp-${DayFlag[t]}`;
	for (let t in SelectionState) e[SelectionState[t]] = `rdp-${SelectionState[t]}`;
	for (let t in Animation) e[Animation[t]] = `rdp-${Animation[t]}`;
	return e;
}
function formatCaption(e, t, n) {
	return (n ?? new DateLib(t)).formatMonthYear(e);
}
function formatDay(e, t, n) {
	return (n ?? new DateLib(t)).format(e, "d");
}
function formatMonthDropdown(e, t = defaultDateLib) {
	return t.format(e, "LLLL");
}
function formatWeekdayName(e, t, n) {
	return (n ?? new DateLib(t)).format(e, "cccccc");
}
function formatWeekNumber(e, t = defaultDateLib) {
	return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function formatWeekNumberHeader() {
	return "";
}
function formatYearDropdown(e, t = defaultDateLib) {
	return t.format(e, "yyyy");
}
var formatters_exports = /* @__PURE__ */ __export({
	formatCaption: () => formatCaption,
	formatDay: () => formatDay,
	formatMonthDropdown: () => formatMonthDropdown,
	formatWeekNumber: () => formatWeekNumber,
	formatWeekNumberHeader: () => formatWeekNumberHeader,
	formatWeekdayName: () => formatWeekdayName,
	formatYearDropdown: () => formatYearDropdown
});
function getFormatters(e) {
	return {
		...formatters_exports,
		...e
	};
}
function labelDayButton(e, t, n, i) {
	let a = (i ?? new DateLib(n)).format(e, "PPPP");
	return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
}
function labelGrid(e, t, n) {
	return (n ?? new DateLib(t)).formatMonthYear(e);
}
function labelGridcell(e, t, n, i) {
	let a = (i ?? new DateLib(n)).format(e, "PPPP");
	return t?.today && (a = `Today, ${a}`), a;
}
function labelMonthDropdown(e) {
	return "Choose the Month";
}
function labelNav() {
	return "";
}
var defaultLabel = "Go to the Next Month";
function labelNext(e, t) {
	return defaultLabel;
}
function labelPrevious(e) {
	return "Go to the Previous Month";
}
function labelWeekday(e, t, n) {
	return (n ?? new DateLib(t)).format(e, "cccc");
}
function labelWeekNumber(e, t) {
	return `Week ${e}`;
}
function labelWeekNumberHeader(e) {
	return "Week Number";
}
function labelYearDropdown(e) {
	return "Choose the Year";
}
var labels_exports = /* @__PURE__ */ __export({
	labelDayButton: () => labelDayButton,
	labelGrid: () => labelGrid,
	labelGridcell: () => labelGridcell,
	labelMonthDropdown: () => labelMonthDropdown,
	labelNav: () => labelNav,
	labelNext: () => labelNext,
	labelPrevious: () => labelPrevious,
	labelWeekNumber: () => labelWeekNumber,
	labelWeekNumberHeader: () => labelWeekNumberHeader,
	labelWeekday: () => labelWeekday,
	labelYearDropdown: () => labelYearDropdown
}), resolveLabel = (e, t, n) => t || (n ? typeof n == "function" ? n : (...e) => n : e);
function getLabels(e, t) {
	let n = t.locale?.labels ?? {};
	return {
		...labels_exports,
		...e ?? {},
		labelDayButton: resolveLabel(labelDayButton, e?.labelDayButton, n.labelDayButton),
		labelMonthDropdown: resolveLabel(labelMonthDropdown, e?.labelMonthDropdown, n.labelMonthDropdown),
		labelNext: resolveLabel(labelNext, e?.labelNext, n.labelNext),
		labelPrevious: resolveLabel(labelPrevious, e?.labelPrevious, n.labelPrevious),
		labelWeekNumber: resolveLabel(labelWeekNumber, e?.labelWeekNumber, n.labelWeekNumber),
		labelYearDropdown: resolveLabel(labelYearDropdown, e?.labelYearDropdown, n.labelYearDropdown),
		labelGrid: resolveLabel(labelGrid, e?.labelGrid, n.labelGrid),
		labelGridcell: resolveLabel(labelGridcell, e?.labelGridcell, n.labelGridcell),
		labelNav: resolveLabel(labelNav, e?.labelNav, n.labelNav),
		labelWeekNumberHeader: resolveLabel(labelWeekNumberHeader, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
		labelWeekday: resolveLabel(labelWeekday, e?.labelWeekday, n.labelWeekday)
	};
}
function getMonthOptions(e, t, n, i, a) {
	let { startOfMonth: o, startOfYear: s, endOfYear: c, eachMonthOfInterval: l, getMonth: u } = a;
	return l({
		start: s(e),
		end: c(e)
	}).map((e) => {
		let s = i.formatMonthDropdown(e, a);
		return {
			value: u(e),
			label: s,
			disabled: t && e < o(t) || n && e > o(n) || !1
		};
	});
}
function getStyleForModifiers(e, t = {}, n = {}) {
	let i = { ...t?.[UI.Day] };
	return Object.entries(e).filter(([, e]) => e === !0).forEach(([e]) => {
		i = {
			...i,
			...n?.[e]
		};
	}), i;
}
function getWeekdays(e, t, n, i) {
	let a = i ?? e.today(), o = n ? e.startOfBroadcastWeek(a, e) : t ? e.startOfISOWeek(a) : e.startOfWeek(a), s = [];
	for (let t = 0; t < 7; t++) {
		let n = e.addDays(o, t);
		s.push(n);
	}
	return s;
}
function getYearOptions(e, t, n, i, a = !1) {
	if (!e || !t) return;
	let { startOfYear: o, endOfYear: s, eachYearOfInterval: c, getYear: l } = i, u = c({
		start: o(e),
		end: s(t)
	});
	return a && u.reverse(), u.map((e) => {
		let t = n.formatYearDropdown(e, i);
		return {
			value: l(e),
			label: t,
			disabled: !1
		};
	});
}
function createNoonOverrides(e, t = {}) {
	let { weekStartsOn: n, locale: i } = t, a = n ?? i?.options?.weekStartsOn ?? 0, o = (t) => {
		let n = typeof t == "number" || typeof t == "string" ? new Date(t) : t;
		return new TZDate(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
	}, s = (e) => {
		let t = o(e);
		return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => o(TZDate.tz(e)),
		newDate: (t, n, i) => new TZDate(t, n, i, 12, 0, 0, e),
		startOfDay: (e) => o(e),
		startOfWeek: (e, t) => {
			let n = o(e), i = t?.weekStartsOn ?? a, s = (n.getDay() - i + 7) % 7;
			return n.setDate(n.getDate() - s), n;
		},
		startOfISOWeek: (e) => {
			let t = o(e), n = (t.getDay() - 1 + 7) % 7;
			return t.setDate(t.getDate() - n), t;
		},
		startOfMonth: (e) => {
			let t = o(e);
			return t.setDate(1), t;
		},
		startOfYear: (e) => {
			let t = o(e);
			return t.setMonth(0, 1), t;
		},
		endOfWeek: (e, t) => {
			let n = o(e), i = (((t?.weekStartsOn ?? a) + 6) % 7 - n.getDay() + 7) % 7;
			return n.setDate(n.getDate() + i), n;
		},
		endOfISOWeek: (e) => {
			let t = o(e), n = (7 - t.getDay()) % 7;
			return t.setDate(t.getDate() + n), t;
		},
		endOfMonth: (e) => {
			let t = o(e);
			return t.setMonth(t.getMonth() + 1, 0), t;
		},
		endOfYear: (e) => {
			let t = o(e);
			return t.setMonth(11, 31), t;
		},
		eachMonthOfInterval: (t) => {
			let n = o(t.start), i = o(t.end), a = [], s = new TZDate(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e), c = i.getFullYear() * 12 + i.getMonth();
			for (; s.getFullYear() * 12 + s.getMonth() <= c;) a.push(new TZDate(s, e)), s.setMonth(s.getMonth() + 1, 1);
			return a;
		},
		addDays: (e, t) => {
			let n = o(e);
			return n.setDate(n.getDate() + t), n;
		},
		addWeeks: (e, t) => {
			let n = o(e);
			return n.setDate(n.getDate() + t * 7), n;
		},
		addMonths: (e, t) => {
			let n = o(e);
			return n.setMonth(n.getMonth() + t), n;
		},
		addYears: (e, t) => {
			let n = o(e);
			return n.setFullYear(n.getFullYear() + t), n;
		},
		eachYearOfInterval: (t) => {
			let n = o(t.start), i = o(t.end), a = [], s = new TZDate(n.getFullYear(), 0, 1, 12, 0, 0, e);
			for (; s.getFullYear() <= i.getFullYear();) a.push(new TZDate(s, e)), s.setFullYear(s.getFullYear() + 1, 0, 1);
			return a;
		},
		getWeek: (e, t) => getWeek(s(e), {
			weekStartsOn: t?.weekStartsOn ?? a,
			firstWeekContainsDate: t?.firstWeekContainsDate ?? i?.options?.firstWeekContainsDate ?? 1
		}),
		getISOWeek: (e) => getISOWeek(s(e)),
		differenceInCalendarDays: (e, t) => differenceInCalendarDays(s(e), s(t)),
		differenceInCalendarMonths: (e, t) => differenceInCalendarMonths(s(e), s(t))
	};
}
var asHtmlElement = (e) => e instanceof HTMLElement ? e : null, queryMonthEls = (e) => [...e.querySelectorAll("[data-animated-month]") ?? []], queryMonthEl = (e) => asHtmlElement(e.querySelector("[data-animated-month]")), queryCaptionEl = (e) => asHtmlElement(e.querySelector("[data-animated-caption]")), queryWeeksEl = (e) => asHtmlElement(e.querySelector("[data-animated-weeks]")), queryNavEl = (e) => asHtmlElement(e.querySelector("[data-animated-nav]")), queryWeekdaysEl = (e) => asHtmlElement(e.querySelector("[data-animated-weekdays]"));
function useAnimation(e, t, { classNames: n, months: i, focused: a, dateLib: o }) {
	let s = useRef(null), c = useRef(i), l = useRef(!1);
	useLayoutEffect(() => {
		let u = c.current;
		if (c.current = i, !t || !e.current || !(e.current instanceof HTMLElement) || i.length === 0 || u.length === 0 || i.length !== u.length) return;
		let d = o.isSameMonth(i[0].date, u[0].date), f = o.isAfter(i[0].date, u[0].date), p = f ? n[Animation.caption_after_enter] : n[Animation.caption_before_enter], m = f ? n[Animation.weeks_after_enter] : n[Animation.weeks_before_enter], h = s.current, g = e.current.cloneNode(!0);
		if (g instanceof HTMLElement ? (queryMonthEls(g).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = queryMonthEl(e);
			t && e.contains(t) && e.removeChild(t);
			let n = queryCaptionEl(e);
			n && n.classList.remove(p);
			let i = queryWeeksEl(e);
			i && i.classList.remove(m);
		}), s.current = g) : s.current = null, l.current || d || a) return;
		let _ = h instanceof HTMLElement ? queryMonthEls(h) : [], v = queryMonthEls(e.current);
		if (v?.every((e) => e instanceof HTMLElement) && _?.every((e) => e instanceof HTMLElement)) {
			l.current = !0;
			let t = [];
			e.current.style.isolation = "isolate";
			let i = queryNavEl(e.current);
			i && (i.style.zIndex = "1"), v.forEach((a, o) => {
				let s = _[o];
				if (!s) return;
				a.style.position = "relative", a.style.overflow = "hidden";
				let c = queryCaptionEl(a);
				c && c.classList.add(p);
				let u = queryWeeksEl(a);
				u && u.classList.add(m);
				let d = () => {
					l.current = !1, e.current && (e.current.style.isolation = ""), i && (i.style.zIndex = ""), c && c.classList.remove(p), u && u.classList.remove(m), a.style.position = "", a.style.overflow = "", a.contains(s) && a.removeChild(s);
				};
				t.push(d), s.style.pointerEvents = "none", s.style.position = "absolute", s.style.overflow = "hidden", s.setAttribute("aria-hidden", "true");
				let h = queryWeekdaysEl(s);
				h && (h.style.opacity = "0");
				let g = queryCaptionEl(s);
				g && (g.classList.add(f ? n[Animation.caption_before_exit] : n[Animation.caption_after_exit]), g.addEventListener("animationend", d));
				let v = queryWeeksEl(s);
				v && v.classList.add(f ? n[Animation.weeks_before_exit] : n[Animation.weeks_after_exit]), a.insertBefore(s, a.firstChild);
			});
		}
	});
}
function getDates(e, t, n, i) {
	let a = e[0], o = e[e.length - 1], { ISOWeek: s, fixedWeeks: c, broadcastCalendar: l } = n ?? {}, { addDays: u, differenceInCalendarDays: d, differenceInCalendarMonths: f, endOfBroadcastWeek: p, endOfISOWeek: m, endOfMonth: h, endOfWeek: g, isAfter: _, startOfBroadcastWeek: v, startOfISOWeek: y, startOfWeek: b } = i, x = l ? v(a, i) : s ? y(a) : b(a), S = l ? p(o) : s ? m(h(o)) : g(h(o)), C = t && (l ? p(t) : s ? m(t) : g(t)), w = d(C && _(S, C) ? C : S, x), T = f(o, a) + 1, E = [];
	for (let e = 0; e <= w; e++) {
		let t = u(x, e);
		E.push(t);
	}
	let D = (l ? 35 : 42) * T;
	if (c && E.length < D) {
		let e = D - E.length;
		for (let t = 0; t < e; t++) {
			let e = u(E[E.length - 1], 1);
			E.push(e);
		}
	}
	return E;
}
function getDays(e) {
	let t = [];
	return e.reduce((e, n) => {
		let i = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
		return e.concat(i.slice());
	}, t.slice());
}
function getDisplayMonths(e, t, n, i) {
	let { numberOfMonths: a = 1 } = n, o = [];
	for (let n = 0; n < a; n++) {
		let a = i.addMonths(e, n);
		if (t && a > t) break;
		o.push(a);
	}
	return o;
}
function getInitialMonth(e, t, n, i) {
	let { month: a, defaultMonth: o, today: s = i.today(), numberOfMonths: c = 1 } = e, l = a || o || s, { differenceInCalendarMonths: u, addMonths: d, startOfMonth: f } = i;
	return n && u(n, l) < c - 1 && (l = d(n, -1 * (c - 1))), t && u(l, t) < 0 && (l = t), f(l);
}
function getMonths(e, t, n, i) {
	let { addDays: a, endOfBroadcastWeek: o, endOfISOWeek: s, endOfMonth: c, endOfWeek: l, getISOWeek: u, getWeek: d, startOfBroadcastWeek: f, startOfISOWeek: p, startOfWeek: m } = i, h = e.reduce((e, h) => {
		let g = n.broadcastCalendar ? f(h, i) : n.ISOWeek ? p(h) : m(h), _ = n.broadcastCalendar ? o(h) : n.ISOWeek ? s(c(h)) : l(c(h)), v = t.filter((e) => e >= g && e <= _), y = n.broadcastCalendar ? 35 : 42;
		if (n.fixedWeeks && v.length < y) {
			let e = t.filter((e) => {
				let t = y - v.length;
				return e > _ && e <= a(_, t);
			});
			v.push(...e);
		}
		let b = new CalendarMonth(h, v.reduce((e, t) => {
			let a = n.ISOWeek ? u(t) : d(t), o = e.find((e) => e.weekNumber === a), s = new CalendarDay(t, h, i);
			return o ? o.days.push(s) : e.push(new CalendarWeek(a, [s])), e;
		}, []));
		return e.push(b), e;
	}, []);
	return n.reverseMonths ? h.reverse() : h;
}
function getNavMonths(e, t) {
	let { startMonth: n, endMonth: i } = e, { startOfYear: a, startOfDay: o, startOfMonth: s, endOfMonth: c, addYears: l, endOfYear: u, today: d } = t, f = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
	return n ? n = s(n) : !n && f && (n = a(l(e.today ?? d(), -100))), i ? i = c(i) : !i && f && (i = u(e.today ?? d())), [n && o(n), i && o(i)];
}
function getNextMonth(e, t, n, i) {
	if (n.disableNavigation) return;
	let { pagedNavigation: a, numberOfMonths: o = 1 } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = i, u = a ? o : 1, d = s(e);
	if (!t || !(l(t, e) < o)) return c(d, u);
}
function getPreviousMonth(e, t, n, i) {
	if (n.disableNavigation) return;
	let { pagedNavigation: a, numberOfMonths: o } = n, { startOfMonth: s, addMonths: c, differenceInCalendarMonths: l } = i, u = a ? o ?? 1 : 1, d = s(e);
	if (!t || !(l(d, t) <= 0)) return c(d, -u);
}
function getWeeks(e) {
	return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
function useControlledValue(e, t) {
	let [n, i] = useState(e);
	return [t === void 0 ? n : t, i];
}
function useCalendar(e, t) {
	let [n, i] = getNavMonths(e, t), { startOfMonth: a, endOfMonth: o } = t, s = getInitialMonth(e, n, i, t), [l, u] = useControlledValue(s, e.month ? s : void 0);
	useEffect(() => {
		u(getInitialMonth(e, n, i, t));
	}, [e.timeZone]);
	let { months: f, weeks: p, days: m, previousMonth: h, nextMonth: g } = useMemo(() => {
		let a = getDisplayMonths(l, i, { numberOfMonths: e.numberOfMonths }, t), s = getMonths(a, getDates(a, e.endMonth ? o(e.endMonth) : void 0, {
			ISOWeek: e.ISOWeek,
			fixedWeeks: e.fixedWeeks,
			broadcastCalendar: e.broadcastCalendar
		}, t), {
			broadcastCalendar: e.broadcastCalendar,
			fixedWeeks: e.fixedWeeks,
			ISOWeek: e.ISOWeek,
			reverseMonths: e.reverseMonths
		}, t);
		return {
			months: s,
			weeks: getWeeks(s),
			days: getDays(s),
			previousMonth: getPreviousMonth(l, n, e, t),
			nextMonth: getNextMonth(l, i, e, t)
		};
	}, [
		t,
		l.getTime(),
		i?.getTime(),
		n?.getTime(),
		e.disableNavigation,
		e.broadcastCalendar,
		e.endMonth?.getTime(),
		e.fixedWeeks,
		e.ISOWeek,
		e.numberOfMonths,
		e.pagedNavigation,
		e.reverseMonths
	]), { disableNavigation: _, onMonthChange: v } = e, y = (e) => p.some((t) => t.days.some((t) => t.isEqualTo(e))), b = (e) => {
		if (_) return;
		let t = a(e);
		n && t < a(n) && (t = a(n)), i && t > a(i) && (t = a(i)), u(t), v?.(t);
	};
	return {
		months: f,
		weeks: p,
		days: m,
		navStart: n,
		navEnd: i,
		previousMonth: h,
		nextMonth: g,
		goToMonth: b,
		goToDay: (e) => {
			y(e) || b(e.date);
		}
	};
}
var FocusTargetPriority;
(function(e) {
	e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(FocusTargetPriority ||= {});
function isFocusableDay(e) {
	return !e[DayFlag.disabled] && !e[DayFlag.hidden] && !e[DayFlag.outside];
}
function calculateFocusTarget(e, t, n, i) {
	let a, o = -1;
	for (let s of e) {
		let e = t(s);
		isFocusableDay(e) && (e[DayFlag.focused] && o < FocusTargetPriority.FocusedModifier ? (a = s, o = FocusTargetPriority.FocusedModifier) : i?.isEqualTo(s) && o < FocusTargetPriority.LastFocused ? (a = s, o = FocusTargetPriority.LastFocused) : n(s.date) && o < FocusTargetPriority.Selected ? (a = s, o = FocusTargetPriority.Selected) : e[DayFlag.today] && o < FocusTargetPriority.Today && (a = s, o = FocusTargetPriority.Today));
	}
	return a ||= e.find((e) => isFocusableDay(t(e))), a;
}
function getFocusableDate(e, t, n, i, a, o, s) {
	let { ISOWeek: c, broadcastCalendar: l } = o, { addDays: u, addMonths: d, addWeeks: f, addYears: p, endOfBroadcastWeek: m, endOfISOWeek: h, endOfWeek: g, max: _, min: v, startOfBroadcastWeek: y, startOfISOWeek: b, startOfWeek: x } = s, S = {
		day: u,
		week: f,
		month: d,
		year: p,
		startOfWeek: (e) => l ? y(e, s) : c ? b(e) : x(e),
		endOfWeek: (e) => l ? m(e) : c ? h(e) : g(e)
	}[e](n, t === "after" ? 1 : -1);
	return t === "before" && i ? S = _([i, S]) : t === "after" && a && (S = v([a, S])), S;
}
function getNextFocus(e, t, n, i, a, o, s, c = 0) {
	if (c > 365) return;
	let l = getFocusableDate(e, t, n.date, i, a, o, s), u = !!(o.disabled && dateMatchModifiers(l, o.disabled, s)), d = !!(o.hidden && dateMatchModifiers(l, o.hidden, s)), f = new CalendarDay(l, l, s);
	return !u && !d ? f : getNextFocus(e, t, f, i, a, o, s, c + 1);
}
function useFocus(e, t, n, i, a) {
	let { autoFocus: o } = e, [s, c] = useState(), l = calculateFocusTarget(t.days, n, i || (() => !1), s), [u, d] = useState(o ? l : void 0);
	return {
		isFocusTarget: (e) => !!l?.isEqualTo(e),
		setFocused: d,
		focused: u,
		blur: () => {
			c(u), d(void 0);
		},
		moveFocus: (n, i) => {
			if (!u) return;
			let o = getNextFocus(n, i, u, t.navStart, t.navEnd, e, a);
			o && (e.disableNavigation && !t.days.some((e) => e.isEqualTo(o)) || (t.goToDay(o), d(o)));
		}
	};
}
function useMulti(e, t) {
	let { selected: n, required: i, onSelect: a } = e, [o, s] = useControlledValue(n, a ? n : void 0), c = a ? n : o, { isSameDay: l } = t, u = (e) => c?.some((t) => l(t, e)) ?? !1, { min: d, max: f } = e;
	return {
		selected: c,
		select: (e, t, n) => {
			let o = [...c ?? []];
			if (u(e)) {
				if (c?.length === d || i && c?.length === 1) return;
				o = c?.filter((t) => !l(t, e));
			} else o = c?.length === f ? [e] : [...o, e];
			return a || s(o), a?.(o, e, t, n), o;
		},
		isSelected: u
	};
}
function addToRange(e, t, n = 0, i = 0, a = !1, o = defaultDateLib) {
	let { from: s, to: c } = t || {}, { isSameDay: l, isAfter: u, isBefore: d } = o, f;
	if (!s && !c) f = {
		from: e,
		to: n > 0 ? void 0 : e
	};
	else if (s && !c) f = l(s, e) ? n === 0 ? {
		from: s,
		to: e
	} : a ? {
		from: s,
		to: void 0
	} : void 0 : d(e, s) ? {
		from: e,
		to: s
	} : {
		from: s,
		to: e
	};
	else if (s && c) if (l(s, e) && l(c, e)) f = a ? {
		from: s,
		to: c
	} : void 0;
	else if (l(s, e)) f = {
		from: s,
		to: n > 0 ? void 0 : e
	};
	else if (l(c, e)) f = {
		from: e,
		to: n > 0 ? void 0 : e
	};
	else if (d(e, s)) f = {
		from: e,
		to: c
	};
	else if (u(e, s)) f = {
		from: s,
		to: e
	};
	else if (u(e, c)) f = {
		from: s,
		to: e
	};
	else throw Error("Invalid range");
	if (f?.from && f?.to) {
		let t = o.differenceInCalendarDays(f.to, f.from);
		(i > 0 && t > i || n > 1 && t < n) && (f = {
			from: e,
			to: void 0
		});
	}
	return f;
}
function rangeContainsDayOfWeek(e, t, n = defaultDateLib) {
	let i = Array.isArray(t) ? t : [t], a = e.from, o = n.differenceInCalendarDays(e.to, e.from), s = Math.min(o, 6);
	for (let e = 0; e <= s; e++) {
		if (i.includes(a.getDay())) return !0;
		a = n.addDays(a, 1);
	}
	return !1;
}
function rangeOverlaps(e, t, n = defaultDateLib) {
	return rangeIncludesDate(e, t.from, !1, n) || rangeIncludesDate(e, t.to, !1, n) || rangeIncludesDate(t, e.from, !1, n) || rangeIncludesDate(t, e.to, !1, n);
}
function rangeContainsModifiers(e, t, n = defaultDateLib) {
	let i = Array.isArray(t) ? t : [t];
	if (i.filter((e) => typeof e != "function").some((t) => typeof t == "boolean" ? t : n.isDate(t) ? rangeIncludesDate(e, t, !1, n) : isDatesArray(t, n) ? t.some((t) => rangeIncludesDate(e, t, !1, n)) : isDateRange(t) ? t.from && t.to ? rangeOverlaps(e, {
		from: t.from,
		to: t.to
	}, n) : !1 : isDayOfWeekType(t) ? rangeContainsDayOfWeek(e, t.dayOfWeek, n) : isDateInterval(t) ? n.isAfter(t.before, t.after) ? rangeOverlaps(e, {
		from: n.addDays(t.after, 1),
		to: n.addDays(t.before, -1)
	}, n) : dateMatchModifiers(e.from, t, n) || dateMatchModifiers(e.to, t, n) : isDateAfterType(t) || isDateBeforeType(t) ? dateMatchModifiers(e.from, t, n) || dateMatchModifiers(e.to, t, n) : !1)) return !0;
	let a = i.filter((e) => typeof e == "function");
	if (a.length) {
		let t = e.from, i = n.differenceInCalendarDays(e.to, e.from);
		for (let e = 0; e <= i; e++) {
			if (a.some((e) => e(t))) return !0;
			t = n.addDays(t, 1);
		}
	}
	return !1;
}
function useRange(e, t) {
	let { disabled: n, excludeDisabled: i, resetOnSelect: a, selected: o, required: s, onSelect: c } = e, [l, u] = useControlledValue(o, c ? o : void 0), d = c ? o : l;
	return {
		selected: d,
		select: (o, l, f) => {
			let { min: p, max: m } = e, h;
			if (o) {
				let e = d?.from, n = d?.to, i = !!e && !!n, c = !!e && !!n && t.isSameDay(e, n) && t.isSameDay(o, e);
				h = a && (i || !d?.from) ? !s && c ? void 0 : {
					from: o,
					to: void 0
				} : addToRange(o, d, p, m, s, t);
			}
			return i && n && h?.from && h.to && rangeContainsModifiers({
				from: h.from,
				to: h.to
			}, n, t) && (h.from = o, h.to = void 0), c || u(h), c?.(h, o, l, f), h;
		},
		isSelected: (e) => d && rangeIncludesDate(d, e, !1, t)
	};
}
function useSingle(e, t) {
	let { selected: n, required: i, onSelect: a } = e, [o, s] = useControlledValue(n, a ? n : void 0), c = a ? n : o, { isSameDay: l } = t;
	return {
		selected: c,
		select: (e, t, n) => {
			let o = e;
			return !i && c && c && l(e, c) && (o = void 0), a || s(o), a?.(o, e, t, n), o;
		},
		isSelected: (e) => c ? l(c, e) : !1
	};
}
function useSelection(e, t) {
	let n = useSingle(e, t), i = useMulti(e, t), a = useRange(e, t);
	switch (e.mode) {
		case "single": return n;
		case "multiple": return i;
		case "range": return a;
		default: return;
	}
}
function toTimeZone(e, t) {
	return e instanceof TZDate && e.timeZone === t ? e : new TZDate(e, t);
}
function toZoneNoon(e, t, n) {
	if (!n) return toTimeZone(e, t);
	let i = toTimeZone(e, t), a = new TZDate(i.getFullYear(), i.getMonth(), i.getDate(), 12, 0, 0, t);
	return new Date(a.getTime());
}
function convertMatcher(e, t, n) {
	return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? toZoneNoon(e, t, n) : Array.isArray(e) ? e.map((e) => e instanceof Date ? toZoneNoon(e, t, n) : e) : isDateRange(e) ? {
		...e,
		from: e.from ? toTimeZone(e.from, t) : e.from,
		to: e.to ? toTimeZone(e.to, t) : e.to
	} : isDateInterval(e) ? {
		before: toZoneNoon(e.before, t, n),
		after: toZoneNoon(e.after, t, n)
	} : isDateAfterType(e) ? { after: toZoneNoon(e.after, t, n) } : isDateBeforeType(e) ? { before: toZoneNoon(e.before, t, n) } : e;
}
function convertMatchersToTimeZone(e, t, n) {
	return e && (Array.isArray(e) ? e.map((e) => convertMatcher(e, t, n)) : convertMatcher(e, t, n));
}
function DayPicker(e) {
	let n = e, i = n.timeZone;
	if (i && (n = {
		...e,
		timeZone: i
	}, n.today &&= toTimeZone(n.today, i), n.month &&= toTimeZone(n.month, i), n.defaultMonth &&= toTimeZone(n.defaultMonth, i), n.startMonth &&= toTimeZone(n.startMonth, i), n.endMonth &&= toTimeZone(n.endMonth, i), n.mode === "single" && n.selected ? n.selected = toTimeZone(n.selected, i) : n.mode === "multiple" && n.selected ? n.selected = n.selected?.map((e) => toTimeZone(e, i)) : n.mode === "range" && n.selected && (n.selected = {
		from: n.selected.from ? toTimeZone(n.selected.from, i) : n.selected.from,
		to: n.selected.to ? toTimeZone(n.selected.to, i) : n.selected.to
	}), n.disabled !== void 0 && (n.disabled = convertMatchersToTimeZone(n.disabled, i)), n.hidden !== void 0 && (n.hidden = convertMatchersToTimeZone(n.hidden, i)), n.modifiers)) {
		let e = {};
		Object.keys(n.modifiers).forEach((t) => {
			e[t] = convertMatchersToTimeZone(n.modifiers?.[t], i);
		}), n.modifiers = e;
	}
	let { components: a, formatters: s, labels: c, dateLib: l, locale: u, classNames: p } = useMemo(() => {
		let e = {
			...enUS,
			...n.locale
		}, t = n.broadcastCalendar ? 1 : n.weekStartsOn, i = n.noonSafe && n.timeZone ? createNoonOverrides(n.timeZone, {
			weekStartsOn: t,
			locale: e
		}) : void 0, a = n.dateLib && i ? {
			...i,
			...n.dateLib
		} : n.dateLib ?? i, o = new DateLib({
			locale: e,
			weekStartsOn: t,
			firstWeekContainsDate: n.firstWeekContainsDate,
			useAdditionalWeekYearTokens: n.useAdditionalWeekYearTokens,
			useAdditionalDayOfYearTokens: n.useAdditionalDayOfYearTokens,
			timeZone: n.timeZone,
			numerals: n.numerals
		}, a);
		return {
			dateLib: o,
			components: getComponents(n.components),
			formatters: getFormatters(n.formatters),
			labels: getLabels(n.labels, o.options),
			locale: e,
			classNames: {
				...getDefaultClassNames(),
				...n.classNames
			}
		};
	}, [
		n.locale,
		n.broadcastCalendar,
		n.weekStartsOn,
		n.firstWeekContainsDate,
		n.useAdditionalWeekYearTokens,
		n.useAdditionalDayOfYearTokens,
		n.timeZone,
		n.numerals,
		n.dateLib,
		n.noonSafe,
		n.components,
		n.formatters,
		n.labels,
		n.classNames
	]);
	n.today || (n = {
		...n,
		today: l.today()
	});
	let { captionLayout: m, mode: h, navLayout: g, numberOfMonths: _ = 1, onDayBlur: v, onDayClick: y, onDayFocus: b, onDayKeyDown: x, onDayMouseEnter: S, onDayMouseLeave: C, onNextClick: w, onPrevClick: T, showWeekNumber: E, styles: D } = n, { formatCaption: O, formatDay: k, formatMonthDropdown: A, formatWeekNumber: j, formatWeekNumberHeader: M, formatWeekdayName: N, formatYearDropdown: P } = s, F = useCalendar(n, l), { days: I, months: L, navStart: R, navEnd: z, previousMonth: B, nextMonth: V, goToMonth: H } = F, U = createGetModifiers(I, n, R, z, l), { isSelected: W, select: G, selected: K } = useSelection(n, l) ?? {}, { blur: q, focused: J, isFocusTarget: Y, moveFocus: Z, setFocused: Q } = useFocus(n, F, U, W ?? (() => !1), l), { labelDayButton: fg, labelGridcell: pg, labelGrid: mg, labelMonthDropdown: hg, labelNav: gg, labelPrevious: _g, labelNext: vg, labelWeekday: yg, labelWeekNumber: bg, labelWeekNumberHeader: xg, labelYearDropdown: Sg } = c, Cg = useMemo(() => getWeekdays(l, n.ISOWeek, n.broadcastCalendar, n.today), [
		l,
		n.ISOWeek,
		n.broadcastCalendar,
		n.today
	]), wg = h !== void 0 || y !== void 0, $ = useCallback(() => {
		B && (H(B), T?.(B));
	}, [
		B,
		H,
		T
	]), Tg = useCallback(() => {
		V && (H(V), w?.(V));
	}, [
		H,
		V,
		w
	]), Eg = useCallback((e, t) => (n) => {
		n.preventDefault(), n.stopPropagation(), Q(e), !t.disabled && (G?.(e.date, t, n), y?.(e.date, t, n));
	}, [
		G,
		y,
		Q
	]), Dg = useCallback((e, t) => (n) => {
		Q(e), b?.(e.date, t, n);
	}, [b, Q]), Og = useCallback((e, t) => (n) => {
		q(), v?.(e.date, t, n);
	}, [q, v]), kg = useCallback((e, t) => (i) => {
		let a = {
			ArrowLeft: [i.shiftKey ? "month" : "day", n.dir === "rtl" ? "after" : "before"],
			ArrowRight: [i.shiftKey ? "month" : "day", n.dir === "rtl" ? "before" : "after"],
			ArrowDown: [i.shiftKey ? "year" : "week", "after"],
			ArrowUp: [i.shiftKey ? "year" : "week", "before"],
			PageUp: [i.shiftKey ? "year" : "month", "before"],
			PageDown: [i.shiftKey ? "year" : "month", "after"],
			Home: ["startOfWeek", "before"],
			End: ["endOfWeek", "after"]
		};
		if (a[i.key]) {
			i.preventDefault(), i.stopPropagation();
			let [e, t] = a[i.key];
			Z(e, t);
		}
		x?.(e.date, t, i);
	}, [
		Z,
		x,
		n.dir
	]), Ag = useCallback((e, t) => (n) => {
		S?.(e.date, t, n);
	}, [S]), jg = useCallback((e, t) => (n) => {
		C?.(e.date, t, n);
	}, [C]), Mg = useCallback((e, t) => (n) => {
		let i = Number(n.target.value), a = l.setMonth(l.startOfMonth(e), i);
		H(l.addMonths(a, -t));
	}, [l, H]), Ng = useCallback((e, t) => (n) => {
		let i = Number(n.target.value), a = l.setYear(l.startOfMonth(e), i);
		H(l.addMonths(a, -t));
	}, [l, H]), { className: Pg, style: Fg } = useMemo(() => ({
		className: [p[UI.Root], n.className].filter(Boolean).join(" "),
		style: {
			...D?.[UI.Root],
			...n.style
		}
	}), [
		p,
		n.className,
		n.style,
		D
	]), Ig = getDataAttributes(n), Lg = (e) => {
		let t = D?.[UI.Dropdown], n = D?.[e];
		if (!(!t && !n)) return {
			...t,
			...n
		};
	}, Rg = useRef(null);
	useAnimation(Rg, !!n.animate, {
		classNames: p,
		months: L,
		focused: J,
		dateLib: l
	});
	let zg = {
		dayPickerProps: n,
		selected: K,
		select: G,
		isSelected: W,
		months: L,
		nextMonth: V,
		previousMonth: B,
		goToMonth: H,
		getModifiers: U,
		components: a,
		classNames: p,
		styles: D,
		labels: c,
		formatters: s
	};
	return React.createElement(dayPickerContext.Provider, { value: zg }, React.createElement(a.Root, {
		rootRef: n.animate ? Rg : void 0,
		className: Pg,
		style: Fg,
		dir: n.dir,
		id: n.id,
		lang: n.lang ?? u.code,
		nonce: n.nonce,
		title: n.title,
		role: n.role,
		"aria-label": n["aria-label"],
		"aria-labelledby": n["aria-labelledby"],
		...Ig
	}, React.createElement(a.Months, {
		className: p[UI.Months],
		style: D?.[UI.Months]
	}, !n.hideNavigation && !g && React.createElement(a.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: p[UI.Nav],
		style: D?.[UI.Nav],
		"aria-label": gg(),
		onPreviousClick: $,
		onNextClick: Tg,
		previousMonth: B,
		nextMonth: V
	}), L.map((e, i) => {
		let o = n.reverseMonths ? L.length - 1 - i : i;
		return React.createElement(a.Month, {
			"data-animated-month": n.animate ? "true" : void 0,
			className: p[UI.Month],
			style: D?.[UI.Month],
			key: i,
			displayIndex: i,
			calendarMonth: e
		}, g === "around" && !n.hideNavigation && i === 0 && React.createElement(a.PreviousMonthButton, {
			type: "button",
			className: p[UI.PreviousMonthButton],
			style: D?.[UI.PreviousMonthButton],
			tabIndex: B ? void 0 : -1,
			"aria-disabled": B ? void 0 : !0,
			"aria-label": _g(B),
			onClick: $,
			"data-animated-button": n.animate ? "true" : void 0
		}, React.createElement(a.Chevron, {
			disabled: B ? void 0 : !0,
			className: p[UI.Chevron],
			style: D?.[UI.Chevron],
			orientation: n.dir === "rtl" ? "right" : "left"
		})), React.createElement(a.MonthCaption, {
			"data-animated-caption": n.animate ? "true" : void 0,
			className: p[UI.MonthCaption],
			style: D?.[UI.MonthCaption],
			calendarMonth: e,
			displayIndex: i
		}, m?.startsWith("dropdown") ? React.createElement(a.DropdownNav, {
			className: p[UI.Dropdowns],
			style: D?.[UI.Dropdowns]
		}, (() => {
			let i = m === "dropdown" || m === "dropdown-months" ? React.createElement(a.MonthsDropdown, {
				key: "month",
				className: p[UI.MonthsDropdown],
				"aria-label": hg(),
				disabled: !!n.disableNavigation,
				onChange: Mg(e.date, o),
				options: getMonthOptions(e.date, R, z, s, l),
				style: Lg(UI.MonthsDropdown),
				value: l.getMonth(e.date)
			}) : React.createElement("span", { key: "month" }, A(e.date, l)), c = m === "dropdown" || m === "dropdown-years" ? React.createElement(a.YearsDropdown, {
				key: "year",
				className: p[UI.YearsDropdown],
				"aria-label": Sg(l.options),
				disabled: !!n.disableNavigation,
				onChange: Ng(e.date, o),
				options: getYearOptions(R, z, s, l, !!n.reverseYears),
				style: Lg(UI.YearsDropdown),
				value: l.getYear(e.date)
			}) : React.createElement("span", { key: "year" }, P(e.date, l));
			return l.getMonthYearOrder() === "year-first" ? [c, i] : [i, c];
		})(), React.createElement("span", {
			role: "status",
			"aria-live": "polite",
			style: {
				border: 0,
				clip: "rect(0 0 0 0)",
				height: "1px",
				margin: "-1px",
				overflow: "hidden",
				padding: 0,
				position: "absolute",
				width: "1px",
				whiteSpace: "nowrap",
				wordWrap: "normal"
			}
		}, O(e.date, l.options, l))) : React.createElement(a.CaptionLabel, {
			className: p[UI.CaptionLabel],
			style: D?.[UI.CaptionLabel],
			role: "status",
			"aria-live": "polite"
		}, O(e.date, l.options, l))), g === "around" && !n.hideNavigation && i === _ - 1 && React.createElement(a.NextMonthButton, {
			type: "button",
			className: p[UI.NextMonthButton],
			style: D?.[UI.NextMonthButton],
			tabIndex: V ? void 0 : -1,
			"aria-disabled": V ? void 0 : !0,
			"aria-label": vg(V),
			onClick: Tg,
			"data-animated-button": n.animate ? "true" : void 0
		}, React.createElement(a.Chevron, {
			disabled: V ? void 0 : !0,
			className: p[UI.Chevron],
			style: D?.[UI.Chevron],
			orientation: n.dir === "rtl" ? "left" : "right"
		})), i === _ - 1 && g === "after" && !n.hideNavigation && React.createElement(a.Nav, {
			"data-animated-nav": n.animate ? "true" : void 0,
			className: p[UI.Nav],
			style: D?.[UI.Nav],
			"aria-label": gg(),
			onPreviousClick: $,
			onNextClick: Tg,
			previousMonth: B,
			nextMonth: V
		}), React.createElement(a.MonthGrid, {
			role: "grid",
			"aria-multiselectable": h === "multiple" || h === "range",
			"aria-label": mg(e.date, l.options, l) || void 0,
			className: p[UI.MonthGrid],
			style: D?.[UI.MonthGrid]
		}, !n.hideWeekdays && React.createElement(a.Weekdays, {
			"data-animated-weekdays": n.animate ? "true" : void 0,
			className: p[UI.Weekdays],
			style: D?.[UI.Weekdays]
		}, E && React.createElement(a.WeekNumberHeader, {
			"aria-label": xg(l.options),
			className: p[UI.WeekNumberHeader],
			style: D?.[UI.WeekNumberHeader],
			scope: "col"
		}, M()), Cg.map((e) => React.createElement(a.Weekday, {
			"aria-label": yg(e, l.options, l),
			className: p[UI.Weekday],
			key: String(e),
			style: D?.[UI.Weekday],
			scope: "col"
		}, N(e, l.options, l)))), React.createElement(a.Weeks, {
			"data-animated-weeks": n.animate ? "true" : void 0,
			className: p[UI.Weeks],
			style: D?.[UI.Weeks]
		}, e.weeks.map((e) => React.createElement(a.Week, {
			className: p[UI.Week],
			key: e.weekNumber,
			style: D?.[UI.Week],
			week: e
		}, E && React.createElement(a.WeekNumber, {
			week: e,
			style: D?.[UI.WeekNumber],
			"aria-label": bg(e.weekNumber, { locale: u }),
			className: p[UI.WeekNumber],
			scope: "row",
			role: "rowheader"
		}, j(e.weekNumber, l)), e.days.map((e) => {
			let { date: i } = e, o = U(e);
			if (o[DayFlag.focused] = !o.hidden && !!J?.isEqualTo(e), o[SelectionState.selected] = W?.(i) || o.selected, isDateRange(K)) {
				let { from: e, to: t } = K;
				o[SelectionState.range_start] = !!(e && t && l.isSameDay(i, e)), o[SelectionState.range_end] = !!(e && t && l.isSameDay(i, t)), o[SelectionState.range_middle] = rangeIncludesDate(K, i, !0, l);
			}
			let s = getStyleForModifiers(o, D, n.modifiersStyles), c = getClassNamesForModifiers(o, p, n.modifiersClassNames), u = !wg && !o.hidden ? pg(i, o, l.options, l) : void 0;
			return React.createElement(a.Day, {
				key: `${e.isoDate}_${e.displayMonthId}`,
				day: e,
				modifiers: o,
				className: c.join(" "),
				style: s,
				role: "gridcell",
				"aria-selected": o.selected || void 0,
				"aria-label": u,
				"data-day": e.isoDate,
				"data-month": e.outside ? e.dateMonthId : void 0,
				"data-selected": o.selected || void 0,
				"data-disabled": o.disabled || void 0,
				"data-hidden": o.hidden || void 0,
				"data-outside": e.outside || void 0,
				"data-focused": o.focused || void 0,
				"data-today": o.today || void 0
			}, !o.hidden && wg ? React.createElement(a.DayButton, {
				className: p[UI.DayButton],
				style: D?.[UI.DayButton],
				type: "button",
				day: e,
				modifiers: o,
				disabled: !o.focused && o.disabled || void 0,
				"aria-disabled": o.focused && o.disabled || void 0,
				tabIndex: Y(e) ? 0 : -1,
				"aria-label": fg(i, o, l.options, l),
				onClick: Eg(e, o),
				onBlur: Og(e, o),
				onFocus: Dg(e, o),
				onKeyDown: kg(e, o),
				onMouseEnter: Ag(e, o),
				onMouseLeave: jg(e, o)
			}, k(i, l.options, l)) : !o.hidden && k(e.date, l.options, l));
		}))))));
	})), n.footer && React.createElement(a.Footer, {
		className: p[UI.Footer],
		style: D?.[UI.Footer],
		role: "status",
		"aria-live": "polite"
	}, n.footer)));
}
const dateRangePickerContent = ["z-50 w-auto rounded-[16px] border border-border bg-surface-elevated p-0 text-text-primary shadow-[var(--shadow-card-raised)]"].join(" ");
var dropdownRoot = [
	"relative inline-flex min-w-0 items-center gap-1",
	"rounded-md border border-border bg-surface-elevated px-2 py-1.5",
	"text-sm font-medium text-text-primary",
	"hover:border-border-strong",
	"data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
].join(" "), dropdownSelect = ["absolute inset-0 z-[2] m-0 h-full w-full cursor-pointer appearance-none border-none bg-transparent p-0 opacity-0"].join(" ");
const calendarClassNames = {
	[UI.Root]: "p-3 rounded-lg",
	[UI.Months]: "flex gap-5",
	[UI.Month]: "relative space-y-4",
	[UI.MonthCaption]: "relative flex h-9 items-center justify-end",
	[UI.Dropdowns]: "flex items-center justify-center gap-2",
	[UI.Nav]: "absolute flex gap-2 z-10 cursor-pointer top-5 left-4",
	[UI.NextMonthButton]: "flex items-center justify-center -rotate-90 w-6 h-6",
	[UI.PreviousMonthButton]: "flex items-center justify-center rotate-90 w-6 h-6",
	[UI.DropdownRoot]: dropdownRoot,
	[UI.Dropdown]: dropdownSelect,
	[UI.MonthsDropdown]: "max-w-[5.5rem]",
	[UI.YearsDropdown]: "min-w-[4.5rem]",
	[UI.CaptionLabel]: "pointer-events-none inline-flex items-center gap-1 text-sm font-medium text-text-primary",
	[UI.Chevron]: "size-4 shrink-0 text-text-muted",
	[UI.MonthGrid]: "w-full border-collapse",
	[UI.Weekdays]: "flex",
	[UI.Weekday]: "w-9 text-center text-[0.8rem] font-normal text-text-muted",
	[UI.Week]: "mt-2 flex w-full",
	[UI.Day]: ["relative p-0 text-center text-sm focus-within:relative focus-within:z-20", "[&:not([data-selected=true])_button:hover]:bg-surface"].join(" "),
	[UI.DayButton]: [
		"inline-flex size-9 items-center justify-center rounded-md p-0 font-normal",
		"text-text-primary",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
		"aria-selected:opacity-100"
	].join(" "),
	[DayFlag.today]: "bg-surface font-medium text-text-primary",
	[DayFlag.outside]: "text-text-subtle opacity-50",
	[DayFlag.disabled]: "text-text-subtle opacity-50",
	[DayFlag.hidden]: "invisible",
	[SelectionState.selected]: "rounded-md bg-accent text-surface-elevated [&_button:hover]:bg-transparent",
	[SelectionState.range_start]: "rounded-l-md bg-accent text-surface-elevated [&_button:hover]:bg-transparent",
	[SelectionState.range_end]: "rounded-r-md bg-accent text-surface-elevated [&_button:hover]:bg-transparent",
	[SelectionState.range_middle]: "rounded-none bg-accent/15 text-text-primary hover:bg-accent/20 [&_button:hover]:bg-transparent"
};
var currentYear = (/* @__PURE__ */ new Date()).getFullYear(), calendarStartMonth = new Date(currentYear - 70, 0), calendarEndMonth = new Date(currentYear + 5, 11);
function Calendar$1({ selected: e, onSelect: t, defaultMonth: n, numberOfMonths: i = 1 }) {
	return /* @__PURE__ */ jsx(DayPicker, {
		mode: "range",
		numberOfMonths: i,
		captionLayout: "dropdown",
		reverseYears: !0,
		startMonth: calendarStartMonth,
		endMonth: calendarEndMonth,
		showOutsideDays: !0,
		selected: e,
		onSelect: t,
		defaultMonth: n ?? e?.from,
		resetOnSelect: !0,
		classNames: calendarClassNames,
		components: { Chevron: ({ className: e }) => /* @__PURE__ */ jsx(ChevronDown, {
			className: e,
			"aria-hidden": !0
		}) }
	});
}
function formatDateRange(e, t) {
	if (!e?.from) return t;
	let n = format(e.from, "MMM d, yyyy");
	if (!e.to) return `${n} – …`;
	let i = format(e.to, "MMM d, yyyy");
	return n === i ? n : `${n} – ${i}`;
}
var DateRangePicker = React$1.forwardRef(({ value: e, defaultValue: t, onValueChange: n, placeholder: i = "Select date range…", disabled: a = !1, errorMessage: o, id: s, variant: c, rounded: u, numberOfMonths: d }, f) => {
	let m = useId(), _ = s ?? m, v = `${_}-error`, y = !!o, b = e !== void 0, [x, S] = useState(t), [C, w] = useState(!1), T = b ? e : x, E = formatDateRange(T, i), D = (e) => {
		b || S(e), n?.(e), e?.from && e?.to && w(!1);
	}, O = (e) => {
		e.preventDefault(), e.stopPropagation(), w(!1), b || S({
			from: void 0,
			to: void 0
		}), n?.({
			from: void 0,
			to: void 0
		});
	}, k = () => {
		a || w((e) => !e);
	}, A = !!T?.from;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full flex-col gap-1.5",
		children: [/* @__PURE__ */ jsxs(Root2, {
			open: a ? !1 : C,
			onOpenChange: (e) => {
				a || w(e);
			},
			children: [/* @__PURE__ */ jsxs("div", {
				"data-variant": c,
				"data-invalid": y || void 0,
				className: fieldVariants({
					variant: c,
					invalid: y,
					rounded: u
				}),
				children: [/* @__PURE__ */ jsx(Trigger, {
					ref: f,
					id: _,
					type: "button",
					disabled: a,
					"aria-invalid": y || void 0,
					"aria-describedby": y ? v : void 0,
					className: "flex h-full w-full min-w-0 items-center justify-between gap-2 bg-transparent text-sm outline-none disabled:cursor-not-allowed",
					children: /* @__PURE__ */ jsx("span", {
						className: T?.from ? "truncate text-text-primary" : "truncate text-text-subtle",
						children: E
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex shrink-0 items-center gap-0.5 [&_button]:size-6",
					children: [A ? /* @__PURE__ */ jsx(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Clear date range",
						disabled: a,
						onClick: O,
						children: /* @__PURE__ */ jsx(X, {
							className: "size-4 text-text-muted",
							"aria-hidden": !0
						})
					}) : null, /* @__PURE__ */ jsx("button", {
						type: "button",
						disabled: a,
						"aria-label": "Open calendar",
						className: "inline-flex size-6 shrink-0 items-center justify-center text-text-muted outline-none hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50",
						onClick: k,
						children: /* @__PURE__ */ jsx(Calendar, {
							className: "size-4",
							"aria-hidden": !0
						})
					})]
				})]
			}), /* @__PURE__ */ jsx(Portal$1, { children: /* @__PURE__ */ jsx(Content2, {
				className: dateRangePickerContent,
				align: "start",
				sideOffset: 4,
				children: /* @__PURE__ */ jsx(Calendar$1, {
					selected: T,
					onSelect: D,
					numberOfMonths: d
				})
			}) })]
		}), o ? /* @__PURE__ */ jsx("p", {
			id: v,
			role: "alert",
			className: "text-xs text-error",
			children: o
		}) : null]
	});
});
DateRangePicker.displayName = "DateRangePicker";
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
		let t = localStorage.getItem(STORAGE_KEY);
		t && THEME_IDS.includes(t) && (e = t);
	} catch {}
	return setTheme(e), e;
}
export { Button, ButtonLink, Card, CardContent, CardDescription, CardFooter, CardHeader, CardMedia, CardTitle, DEFAULT_THEME, DateRangePicker, Input, Label, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalTrigger, Select, THEME_IDS, getTheme, initTheme, setTheme, setThemeWithPersistence };
