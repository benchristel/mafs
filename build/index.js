"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  Circle: () => Circle,
  Coordinates: () => Coordinates,
  Debug: () => Debug,
  Ellipse: () => Ellipse,
  LaTeX: () => LaTeX,
  Line: () => Line,
  Mafs: () => Mafs,
  MovablePoint: () => MovablePoint,
  Plot: () => Plot,
  Point: () => Point,
  Polygon: () => Polygon,
  Polyline: () => Polyline,
  Text: () => Text,
  Theme: () => Theme,
  Transform: () => Transform,
  Vector: () => Vector,
  labelPi: () => autoPi,
  useMovablePoint: () => useMovablePoint,
  usePaneContext: () => usePaneContext,
  useStopwatch: () => useStopwatch,
  useTransformContext: () => useTransformContext,
  vec: () => vec
});
module.exports = __toCommonJS(src_exports);

// src/view/Mafs.tsx
var React8 = __toESM(require("react"), 1);

// src/context/CoordinateContext.tsx
var React = __toESM(require("react"), 1);
var import_tiny_invariant = __toESM(require("tiny-invariant"), 1);
var CoordinateContext = React.createContext(null);
CoordinateContext.displayName = "CoordinateContext";
function useCoordinateContext() {
  const context = React.useContext(CoordinateContext);
  (0, import_tiny_invariant.default)(
    context,
    "CoordinateContext is not loaded. Are you rendering a Mafs component outside of Mafs?"
  );
  return context;
}
var CoordinateContext_default = CoordinateContext;

// src/context/PaneContext.tsx
var React2 = __toESM(require("react"), 1);

// src/math.ts
function round(value, precision = 0) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
function range(min, max, step = 1) {
  const result = [];
  for (let i = min; i < max - step / 2; i += step) {
    result.push(i);
  }
  const computedMax = result[result.length - 1] + step;
  if (Math.abs(max - computedMax) < step / 1e-6) {
    result.push(max);
  } else {
    result.push(computedMax);
  }
  return result;
}
function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

// src/context/PaneContext.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var { round: round2, ceil, floor, log2 } = Math;
var PaneContext = React2.createContext({
  xPanes: [],
  yPanes: [],
  xPaneRange: [0, 0],
  yPaneRange: [0, 0]
});
PaneContext.displayName = "PaneContext";
function usePaneContext() {
  return React2.useContext(PaneContext);
}
function PaneManager({ children }) {
  const { xMin, xMax, yMin, yMax } = useCoordinateContext();
  const xPaneSize = 2 ** round2(log2(xMax - xMin) - 1);
  const yPaneSize = 2 ** round2(log2(yMax - yMin) - 1);
  const pad = 1 / 8;
  const xLowerBound = xPaneSize * floor(xMin / xPaneSize - pad);
  const xUpperBound = xPaneSize * ceil(xMax / xPaneSize + pad);
  const yLowerBound = yPaneSize * floor(yMin / yPaneSize - pad);
  const yUpperBound = yPaneSize * ceil(yMax / yPaneSize + pad);
  const xPanes = React2.useMemo(
    () => range(xLowerBound, xUpperBound - xPaneSize, xPaneSize).map(
      (xMin2) => [xMin2, xMin2 + xPaneSize]
    ),
    [xLowerBound, xUpperBound, xPaneSize]
  );
  const yPanes = React2.useMemo(
    () => range(yLowerBound, yUpperBound - yPaneSize, yPaneSize).map(
      (yMin2) => [yMin2, yMin2 + yPaneSize]
    ),
    [yLowerBound, yUpperBound, yPaneSize]
  );
  const context = React2.useMemo(
    () => ({
      xPanes,
      yPanes,
      xPaneRange: [xLowerBound, xUpperBound],
      yPaneRange: [yLowerBound, yUpperBound]
    }),
    [xPanes, yPanes, xLowerBound, xUpperBound, yLowerBound, yUpperBound]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaneContext.Provider, { value: context, children });
}
PaneManager.displayName = "PaneManager";
var PaneContext_default = PaneManager;

// src/view/Mafs.tsx
var import_use_resize_observer = __toESM(require("use-resize-observer"), 1);
var import_react = require("@use-gesture/react");

// src/vec.ts
var vec;
((vec2) => {
  function add(v, v2) {
    return [v[0] + v2[0], v[1] + v2[1]];
  }
  vec2.add = add;
  function sub(v, v2) {
    return [v[0] - v2[0], v[1] - v2[1]];
  }
  vec2.sub = sub;
  function mag(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  }
  vec2.mag = mag;
  function normal(v) {
    return [-v[1], v[0]];
  }
  vec2.normal = normal;
  function lerp(v1, v2, t) {
    const d = sub(v2, v1);
    const m = mag(d);
    return add(v1, withMag(d, t * m));
  }
  vec2.lerp = lerp;
  function withMag(v, m) {
    const magnitude = mag(v);
    return scale(v, m / magnitude);
  }
  vec2.withMag = withMag;
  function normalize(v) {
    return withMag(v, 1);
  }
  vec2.normalize = normalize;
  function scale(v, sc) {
    return [v[0] * sc, v[1] * sc];
  }
  vec2.scale = scale;
  function transform(v, m) {
    return [v[0] * m[0] + v[1] * m[1] + m[2], v[0] * m[3] + v[1] * m[4] + m[5]];
  }
  vec2.transform = transform;
  function matrixMult(m, m2) {
    return matrixCreate(
      m[0] * m2[0] + m[1] * m2[3],
      m[3] * m2[0] + m[4] * m2[3],
      m[0] * m2[1] + m[1] * m2[4],
      m[3] * m2[1] + m[4] * m2[4],
      m[0] * m2[2] + m[1] * m2[5] + m[2],
      m[3] * m2[2] + m[4] * m2[5] + m[5]
    );
  }
  vec2.matrixMult = matrixMult;
  function rotate(v, a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return [v[0] * c - v[1] * s, v[0] * s + v[1] * c];
  }
  vec2.rotate = rotate;
  function rotateAbout(v, cp, a) {
    const v2 = sub(v, cp);
    return add(cp, rotate(v2, a));
  }
  vec2.rotateAbout = rotateAbout;
  function midpoint(v, v2) {
    return lerp(v, v2, 0.5);
  }
  vec2.midpoint = midpoint;
  function dist(v, v2) {
    return Math.sqrt(squareDist(v, v2));
  }
  vec2.dist = dist;
  function squareDist(v, v2) {
    return Math.pow(v2[0] - v[0], 2) + Math.pow(v2[1] - v[1], 2);
  }
  vec2.squareDist = squareDist;
  function dot(v, v2) {
    return v[0] * v2[0] + v[1] * v2[1];
  }
  vec2.dot = dot;
  function det(m) {
    return m[0] * m[4] - m[3] * m[1];
  }
  vec2.det = det;
  function matrixInvert(a) {
    const mDet = det(a);
    if (!mDet)
      return null;
    const invDet = 1 / mDet;
    const a00 = a[0], a01 = a[1], a02 = a[2];
    const a10 = a[3], a11 = a[4], a12 = a[5];
    return matrixCreate(
      invDet * a11,
      invDet * -a10,
      invDet * -a01,
      invDet * a00,
      invDet * (a12 * a01 - a02 * a11),
      invDet * (-a12 * a00 + a02 * a10)
    );
  }
  vec2.matrixInvert = matrixInvert;
  function matrixBuilder(m = null) {
    const _m = m || matrixCreate();
    return {
      mult: (m2) => matrixBuilder(matrixMult(m2, _m)),
      translate: (x, y) => matrixBuilder(matrixMult(matrixCreate(1, 0, 0, 1, x, y), _m)),
      rotate: (a) => {
        const c = Math.cos(a);
        const s = Math.sin(a);
        return matrixBuilder(matrixMult(matrixCreate(c, s, -s, c), _m));
      },
      scale: (x, y) => matrixBuilder(matrixMult(matrixCreate(x, 0, 0, y), _m)),
      shear: (x, y) => matrixBuilder(matrixMult(matrixCreate(1, y, x, 1), _m)),
      get: () => [..._m]
    };
  }
  vec2.matrixBuilder = matrixBuilder;
  function toCSS(matrix) {
    const [a, c, tx, b, d, ty] = matrix;
    return `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`;
  }
  vec2.toCSS = toCSS;
  vec2.identity = matrixBuilder().get();
})(vec || (vec = {}));
function matrixCreate(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
  return [a, c, tx, b, d, ty];
}

// src/context/TransformContext.tsx
var React3 = __toESM(require("react"), 1);
var import_tiny_invariant2 = __toESM(require("tiny-invariant"), 1);
var TransformContext = React3.createContext(null);
TransformContext.displayName = "TransformContext";
function useTransformContext() {
  const context = React3.useContext(TransformContext);
  (0, import_tiny_invariant2.default)(
    context,
    "TransformContext is not loaded. Are you rendering a Mafs component outside of a MafsView?"
  );
  return context;
}

// src/context/SpanContext.tsx
var React4 = __toESM(require("react"), 1);
var import_tiny_invariant3 = __toESM(require("tiny-invariant"), 1);
var SpanContext = React4.createContext({
  xSpan: 0,
  ySpan: 0
});
SpanContext.displayName = "SpanContext";
function useSpanContext() {
  const context = React4.useContext(SpanContext);
  (0, import_tiny_invariant3.default)(context, "SpanContext is not defined");
  return context;
}

// src/view/Mafs.tsx
var import_tiny_invariant4 = __toESM(require("tiny-invariant"), 1);

// src/gestures/useCamera.tsx
var React5 = __toESM(require("react"), 1);
function useCamera({ minZoom, maxZoom }) {
  const [matrix, setMatrix] = React5.useState(vec.identity);
  const initialMatrix = React5.useRef(vec.identity);
  return {
    matrix,
    setBase() {
      initialMatrix.current = matrix;
    },
    move({ zoom, pan }) {
      const scale = 1 / (zoom?.scale ?? 1);
      const zoomAt = zoom?.at ?? [0, 0];
      const currentScale = initialMatrix.current[0];
      const minScale = 1 / maxZoom / currentScale;
      const maxScale = 1 / minZoom / currentScale;
      const clampedScale = clamp(scale, minScale, maxScale);
      const newCamera = vec.matrixBuilder(initialMatrix.current).translate(...vec.scale(zoomAt, -1)).scale(clampedScale, clampedScale).translate(...vec.scale(zoomAt, 1)).translate(...pan ?? [0, 0]).get();
      setMatrix(newCamera);
    }
  };
}

// src/gestures/useWheelEnabler.tsx
var React6 = __toESM(require("react"), 1);
function useWheelEnabler(zoomEnabled) {
  const [wheelEnabled, setWheelEnabled] = React6.useState(false);
  const timer = React6.useRef(0);
  React6.useEffect(() => {
    if (!zoomEnabled)
      return;
    function handleWindowScroll() {
      setWheelEnabled(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setWheelEnabled(true);
      }, 500);
    }
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [zoomEnabled]);
  return {
    wheelEnabled: zoomEnabled ? wheelEnabled : false,
    handleMouseMove() {
      setWheelEnabled(true);
    }
  };
}

// src/context/TestContext.tsx
var React7 = __toESM(require("react"), 1);
var TestContext = React7.createContext({
  overrideHeight: void 0
});
var TestContextProvider = TestContext.Provider;

// src/view/Mafs.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Mafs({
  width: propWidth = "auto",
  height: propHeight = 500,
  pan = true,
  zoom = false,
  viewBox = { x: [-3, 3], y: [-3, 3] },
  preserveAspectRatio = "contain",
  children,
  ssr = false,
  onClick = void 0
}) {
  const testContext = React8.useContext(TestContext);
  const height = testContext.overrideHeight ?? propHeight;
  const desiredCssWidth = propWidth === "auto" ? "100%" : `${propWidth}px`;
  const rootRef = React8.useRef(null);
  const { width = propWidth === "auto" ? ssr ? 500 : 0 : propWidth } = (0, import_use_resize_observer.default)({
    ref: propWidth === "auto" ? rootRef : null
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      className: "MafsView",
      style: { width: desiredCssWidth, height },
      tabIndex: pan || zoom ? 0 : -1,
      ref: rootRef,
      children: width > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        MafsCanvas,
        {
          width,
          height,
          desiredCssWidth,
          rootRef,
          pan,
          zoom,
          viewBox,
          preserveAspectRatio,
          ssr,
          onClick,
          children
        }
      )
    }
  );
}
function MafsCanvas({
  width,
  height,
  desiredCssWidth,
  rootRef,
  pan,
  zoom,
  viewBox,
  preserveAspectRatio,
  children,
  onClick
}) {
  let minZoom = 1;
  let maxZoom = 1;
  if (typeof zoom === "object") {
    (0, import_tiny_invariant4.default)(zoom.min > 0 && zoom.min <= 1, "zoom.min must be in the range (0, 1]");
    (0, import_tiny_invariant4.default)(zoom.max >= 1, "zoom.max must be in the range [1, \u221E)");
    minZoom = zoom.min;
    maxZoom = zoom.max;
  } else if (zoom) {
    minZoom = 0.5;
    maxZoom = 5;
  }
  const camera = useCamera({ minZoom, maxZoom });
  const padding = viewBox?.padding ?? 0.5;
  let xMin = (viewBox?.x?.[0] ?? 0) - padding;
  let xMax = (viewBox?.x?.[1] ?? 0) + padding;
  let yMin = (viewBox?.y?.[0] ?? 0) - padding;
  let yMax = (viewBox?.y?.[1] ?? 0) + padding;
  if (preserveAspectRatio === "contain") {
    const aspect = width / height;
    const aoiAspect = (xMax - xMin) / (yMax - yMin);
    if (aoiAspect > aspect) {
      const yCenter = (yMax + yMin) / 2;
      const ySpan2 = (xMax - xMin) / aspect / 2;
      yMin = yCenter - ySpan2;
      yMax = yCenter + ySpan2;
    } else {
      const xCenter = (xMax + xMin) / 2;
      const xSpan2 = (yMax - yMin) * aspect / 2;
      xMin = xCenter - xSpan2;
      xMax = xCenter + xSpan2;
    }
  }
  ;
  [xMin, yMin] = vec.transform([xMin, yMin], camera.matrix);
  [xMax, yMax] = vec.transform([xMax, yMax], camera.matrix);
  const xSpan = xMax - xMin;
  const ySpan = yMax - yMin;
  const viewTransform = React8.useMemo(() => {
    const scaleX = round(1 / xSpan * width, 5);
    const scaleY = round(-1 / ySpan * height, 5);
    return vec.matrixBuilder().scale(scaleX, scaleY).get();
  }, [height, width, xSpan, ySpan]);
  const viewBoxX = round(xMin / (xMax - xMin) * width, 10);
  const viewBoxY = round(yMax / (yMin - yMax) * height, 10);
  const inverseViewTransform = vec.matrixInvert(viewTransform);
  const pickupOrigin = React8.useRef([0, 0]);
  const pickupPoint = React8.useRef([0, 0]);
  function mapGesturePoint(point) {
    const el = rootRef.current;
    (0, import_tiny_invariant4.default)(el, "SVG is not mounted");
    (0, import_tiny_invariant4.default)(inverseViewTransform, "View transform is not invertible");
    const rect = el.getBoundingClientRect();
    return vec.transform(
      [point[0] - rect.left + viewBoxX, point[1] - rect.top + viewBoxY],
      inverseViewTransform
    );
  }
  const wheelEnabler = useWheelEnabler(!!zoom);
  const justDragged = React8.useRef(false);
  (0, import_react.useGesture)(
    {
      onDrag: ({ movement, first, event, type, pinching, memo = [0, 0], last }) => {
        if (pinching)
          return movement;
        if (first)
          camera.setBase();
        const [mx, my] = vec.sub(movement, memo);
        camera.move({ pan: [-mx / width * xSpan, my / height * ySpan] });
        const keyboard = type.includes("key");
        if (keyboard)
          event?.preventDefault();
        if (last) {
          justDragged.current = true;
          setTimeout(() => justDragged.current = false, 10);
        }
        return !keyboard && first ? movement : memo;
      },
      onPinch: ({ first, movement: [scale], origin, event, last }) => {
        if (!event.currentTarget || !inverseViewTransform)
          return;
        if (first) {
          camera.setBase();
          pickupOrigin.current = origin;
          pickupPoint.current = pan ? mapGesturePoint(origin) : [(xMin + xMax) / 2, (yMin + yMax) / 2];
        }
        let offset = [0, 0];
        if (pan) {
          offset = vec.transform(vec.sub(origin, pickupOrigin.current), inverseViewTransform);
        }
        camera.move({ zoom: { at: pickupPoint.current, scale }, pan: vec.scale(offset, -1) });
        if (last)
          camera.setBase();
      },
      onWheel: ({ pinching, event, delta: [, scroll] }) => {
        if (pinching)
          return;
        const scale = 2 / (1 + Math.exp(-scroll / 300));
        const point = mapGesturePoint([event.clientX, event.clientY]);
        camera.setBase();
        camera.move({ zoom: { at: point, scale: 1 / scale } });
      },
      onKeyDown: ({ event }) => {
        if (event.metaKey)
          return;
        const base = { Equal: 1, Minus: -1 }[event.code] ?? 0;
        if (!base)
          return;
        let multiplier = 0.1;
        if (event.altKey || event.metaKey)
          multiplier = 0.01;
        if (event.shiftKey)
          multiplier = 0.3;
        const scale = 1 + base * multiplier;
        const center = [(xMax + xMin) / 2, (yMax + yMin) / 2];
        camera.setBase();
        camera.move({ zoom: { at: center, scale } });
      },
      onMouseMove: () => {
        wheelEnabler.handleMouseMove();
      },
      onClick: ({ event }) => {
        if (!onClick || !rootRef.current || justDragged.current)
          return;
        const box = rootRef.current.getBoundingClientRect();
        const pxX = event.clientX - box.left;
        const pxY = box.bottom - event.clientY;
        const x = pxX / width * xSpan + xMin;
        const y = pxY / height * ySpan + yMin;
        onClick([x, y], event);
      }
    },
    {
      drag: { enabled: pan, eventOptions: { passive: false }, threshold: 1 },
      pinch: { enabled: !!zoom, eventOptions: { passive: false } },
      wheel: {
        enabled: wheelEnabler.wheelEnabled,
        preventDefault: true,
        eventOptions: { passive: false }
      },
      target: rootRef
    }
  );
  const viewTransformCSS = vec.toCSS(viewTransform);
  const coordinateContext = React8.useMemo(
    () => ({ xMin, xMax, yMin, yMax, height, width }),
    [xMin, xMax, yMin, yMax, height, width]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CoordinateContext_default.Provider, { value: coordinateContext, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SpanContext.Provider, { value: { xSpan, ySpan }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    TransformContext.Provider,
    {
      value: { userTransform: vec.identity, viewTransform },
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(PaneContext_default, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "svg",
        {
          width,
          height,
          viewBox: `${viewBoxX} ${viewBoxY} ${width} ${height}`,
          preserveAspectRatio: "xMidYMin",
          style: {
            width: desiredCssWidth,
            touchAction: pan ? "none" : "auto",
            ...{
              "--mafs-view-transform": viewTransformCSS,
              "--mafs-user-transform": "translate(0, 0)"
            }
          },
          children
        }
      ) })
    }
  ) }) });
}
Mafs.displayName = "Mafs";

// src/display/Coordinates/Axes.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var defaultLabelMaker = (x) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
  x,
  x < 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("tspan", { visibility: "hidden", children: "-" })
] });
var defaultAxisOptions = {
  axis: true,
  lines: 1,
  labels: defaultLabelMaker
};
function XLabels({ separation, labelMaker }) {
  const { viewTransform } = useTransformContext();
  const { xPanes } = usePaneContext();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { className: "mafs-axis", children: xPanes.map(([min, max]) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { children: snappedRange(min, max, separation).filter((x) => Math.abs(x) > separation / 1e6).map((x) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "text",
    {
      x: vec.transform([x, 0], viewTransform)[0],
      y: 5,
      dominantBaseline: "hanging",
      textAnchor: "middle",
      style: { fill: "var(--mafs-origin-color)", paintOrder: "stroke" },
      children: labelMaker(x)
    },
    x
  )) }, `${min},${max}`)) });
}
XLabels.displayName = "CartesianCoordinates.XLabels";
function YLabels({ separation, labelMaker }) {
  const { viewTransform } = useTransformContext();
  const { yPanes } = usePaneContext();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { className: "mafs-axis", children: yPanes.map(([min, max]) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("g", { children: snappedRange(min, max, separation).filter((y) => Math.abs(y) > separation / 1e6).map((y) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "text",
    {
      x: 5,
      y: vec.transform([0, y], viewTransform)[1],
      dominantBaseline: "central",
      style: { fill: "var(--mafs-origin-color)", paintOrder: "stroke" },
      children: labelMaker(y)
    },
    y
  )) }, `${min},${max}`)) });
}
YLabels.displayName = "CartesianCoordinates.YLabels";

// src/display/Coordinates/Cartesian.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var incrementer = 0;
function Cartesian({
  xAxis: xAxisOverrides,
  yAxis: yAxisOverrides,
  subdivisions = false
}) {
  const xAxisEnabled = xAxisOverrides !== false;
  const yAxisEnabled = yAxisOverrides !== false;
  const xAxis = { subdivisions, ...defaultAxisOptions, ...xAxisOverrides };
  const yAxis = { subdivisions, ...defaultAxisOptions, ...yAxisOverrides };
  const id = `cartesian-${incrementer++}`;
  const { viewTransform } = useTransformContext();
  const { xPaneRange, yPaneRange } = usePaneContext();
  const [xMin, xMax] = xPaneRange;
  const [yMin, yMax] = yPaneRange;
  const [vxMin, vyMin] = vec.transform([xMin, yMin], viewTransform);
  const [vxMax, vyMax] = vec.transform([xMax, yMax], viewTransform);
  const xLines = xAxis.lines || 1;
  const yLines = yAxis.lines || 1;
  const [unitW, unitH] = vec.transform([xLines, -yLines], viewTransform);
  const xSubs = xAxis.subdivisions || 1;
  const ySubs = yAxis.subdivisions || 1;
  const subUnitW = unitW / xSubs;
  const subUnitH = unitH / ySubs;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("g", { fill: "none", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("pattern", { x: 0, y: 0, width: unitW, height: unitH, id, patternUnits: "userSpaceOnUse", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "pattern",
        {
          width: subUnitW,
          height: subUnitH,
          id: `${id}-subdivision`,
          patternUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("g", { stroke: "var(--grid-line-subdivision-color)", children: [
            xAxisEnabled !== false && xSubs > 1 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 0, y1: 0, x2: 0, y2: subUnitH }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: subUnitW, y1: 0, x2: subUnitW, y2: subUnitH })
            ] }),
            yAxisEnabled !== false && ySubs > 1 && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 0, y1: 0, x2: subUnitW, y2: 0 }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 0, y1: subUnitH, x2: subUnitW, y2: subUnitH })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { width: unitW, height: unitH, fill: `url(#${id}-subdivision)` }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("g", { stroke: "var(--mafs-line-color)", children: [
        yAxisEnabled && xAxis.lines && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 0, y1: 0, x2: unitW, y2: 0 }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 0, y1: unitH, x2: unitW, y2: unitH })
        ] }),
        xAxisEnabled && yAxis.lines && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 0, y1: 0, x2: 0, y2: unitH }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: unitW, y1: 0, x2: unitW, y2: unitH })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: vxMin, y: vyMax, width: vxMax - vxMin, height: vyMin - vyMax, fill: `url(#${id})` }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("g", { stroke: "var(--mafs-origin-color)", children: [
      xAxisEnabled && xAxis.axis && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: vxMin, y1: 0, x2: vxMax, y2: 0 }),
      yAxisEnabled && yAxis.axis && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 0, y1: vyMin, x2: 0, y2: vyMax })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("g", { className: "mafs-shadow", children: [
      xAxisEnabled && xAxis.labels && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(XLabels, { separation: xAxis.lines || 1, labelMaker: xAxis.labels }),
      yAxisEnabled && yAxis.labels && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(YLabels, { separation: yAxis.lines || 1, labelMaker: yAxis.labels })
    ] })
  ] });
}
function snappedRange(min, max, step) {
  const roundMin = Math.floor(min / step) * step;
  const roundMax = Math.ceil(max / step) * step;
  if (roundMin === roundMax - step)
    return [roundMin];
  return range(roundMin, roundMax - step, step);
}
function autoPi(x) {
  if (x === 0)
    return "0";
  if (Math.abs(Math.PI - x) < 1e-3)
    return "\u03C0";
  if (Math.abs(-Math.PI - x) < 1e-3)
    return "-\u03C0";
  return `${round(x / Math.PI, 5)}\u03C0`;
}

// src/display/Coordinates/Polar.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var thetas = range(0, 2 * Math.PI, Math.PI / 12);
function PolarCoordinates({
  xAxis: xAxisOverrides,
  yAxis: yAxisOverrides,
  lines = 1,
  subdivisions
}) {
  const xAxisEnabled = xAxisOverrides !== false;
  const yAxisEnabled = yAxisOverrides !== false;
  const xAxis = { ...defaultAxisOptions, ...xAxisOverrides };
  const yAxis = { ...defaultAxisOptions, ...yAxisOverrides };
  const { viewTransform } = useTransformContext();
  const { xPaneRange, yPaneRange } = usePaneContext();
  const [xMin, xMax] = xPaneRange;
  const [yMin, yMax] = yPaneRange;
  const distances = [
    vec.mag([xMin, yMin]),
    vec.mag([xMin, yMax]),
    vec.mag([xMax, yMin]),
    vec.mag([xMax, yMax]),
    vec.mag([(xMin + xMax) / 2, (yMin + yMax) / 2])
  ];
  const b = lines;
  const closeToOrigin = Math.min(...distances) < Math.max(xMax - xMin, yMax - yMin);
  const minRadiusPrecise = closeToOrigin ? 0 : Math.min(...distances);
  const maxRadiusPrecise = Math.max(...distances);
  const minRadius = Math.floor(minRadiusPrecise / b) * b;
  const maxRadius = Math.ceil(maxRadiusPrecise / b) * b;
  const [vxMin, vyMin] = vec.transform([xMin, yMin], viewTransform);
  const [vxMax, vyMax] = vec.transform([xMax, yMax], viewTransform);
  const [scaleX, scaleY] = vec.transform([1, -1], viewTransform);
  const rs = range(minRadius, maxRadius, b);
  const subRs = subdivisions != void 0 ? range(minRadius, maxRadius, b / subdivisions) : [];
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { fill: "none", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("g", { stroke: "var(--grid-line-subdivision-color)", children: thetas.map((theta) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "line",
      {
        x1: 0,
        y1: 0,
        x2: Math.cos(theta) * maxRadius * scaleX,
        y2: -Math.sin(theta) * maxRadius * scaleY
      },
      theta
    )) }),
    subRs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "ellipse",
      {
        "data-r": r,
        cx: 0,
        cy: 0,
        rx: r * scaleX,
        ry: r * scaleY,
        stroke: "var(--grid-line-subdivision-color)"
      },
      r
    )),
    rs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "ellipse",
      {
        "data-r": r,
        cx: 0,
        cy: 0,
        rx: r * scaleX,
        ry: r * scaleY,
        stroke: "var(--mafs-line-color)"
      },
      r
    )),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { stroke: "var(--mafs-origin-color)", children: [
      xAxisEnabled && xAxis.axis && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: vxMin, y1: 0, x2: vxMax, y2: 0 }),
      yAxisEnabled && yAxis.axis && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: 0, y1: vyMin, x2: 0, y2: vyMax })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { className: "mafs-shadow", children: [
      xAxisEnabled && xAxis.labels && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        XLabels,
        {
          separation: xAxisOverrides?.lines || lines || 1,
          labelMaker: xAxis.labels || defaultLabelMaker
        }
      ),
      yAxisEnabled && yAxis.labels && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        YLabels,
        {
          separation: yAxisOverrides?.lines || lines || 1,
          labelMaker: yAxis.labels || defaultLabelMaker
        }
      )
    ] })
  ] });
}

// src/display/Coordinates/index.tsx
PolarCoordinates.displayName = "Coordinates.Polar";
Cartesian.displayName = "Coordinates.Cartesian";
var Coordinates = {
  Cartesian,
  Polar: PolarCoordinates
};

// src/display/Plot/Simple.tsx
var React10 = __toESM(require("react"), 1);

// src/display/Plot/Parametric.tsx
var React9 = __toESM(require("react"), 1);

// src/display/Plot/PlotUtils.tsx
function sample({
  domain,
  minDepth,
  maxDepth,
  threshold,
  fn,
  error,
  onPoint,
  midpoint
}) {
  const [min, max] = domain;
  function subdivide(min2, max2, pushLeft, pushRight, depth, pMin, pMax) {
    const t = 0.5;
    const mid = min2 + (max2 - min2) * t;
    const pMid = fn(mid);
    if (depth < minDepth) {
      subdivide(min2, mid, true, false, depth + 1, pMin, pMid);
      subdivide(mid, max2, false, true, depth + 1, pMid, pMax);
      return;
    }
    if (depth < maxDepth) {
      const fnMidpoint = midpoint(pMin, pMax);
      const e = error(pMid, fnMidpoint);
      if (e > threshold) {
        subdivide(min2, mid, true, false, depth + 1, pMin, pMid);
        subdivide(mid, max2, false, true, depth + 1, pMid, pMax);
        return;
      }
    }
    if (pushLeft) {
      onPoint(min2, pMin);
    }
    onPoint(mid, pMid);
    if (pushRight) {
      onPoint(max2, pMax);
    }
  }
  subdivide(min, max, true, true, 0, fn(min), fn(max));
}
function sampleParametric(fn, domain, minDepth, maxDepth, threshold) {
  let result = "M ";
  sample({
    fn,
    error: (a, b) => vec.squareDist(a, b),
    onPoint: (_t, [x, y]) => {
      if (Number.isFinite(x) && Number.isFinite(y)) {
        result += `${x} ${y} L `;
      }
    },
    midpoint: (p1, p2) => vec.midpoint(p1, p2),
    domain,
    minDepth,
    maxDepth,
    threshold
  });
  return result.substring(0, result.length - 2);
}
function sampleInequality(rangeAxis, upper, lower, domain, minDepth, maxDepth, threshold) {
  const result = { fill: "", upper: "", lower: "" };
  let upperTmp = "";
  let lowerTmp = "";
  let ineqFalse = false;
  let prevX = 0;
  let prevUpper = 0;
  let prevLower = 0;
  function pointToString(x, y) {
    return rangeAxis === "x" ? `${x} ${y}` : `${y} ${x}`;
  }
  sample({
    domain,
    minDepth,
    maxDepth,
    threshold,
    fn: (x) => [
      [x, lower(x)],
      [x, upper(x)]
    ],
    error: ([realLower, realUpper], [estLower, estUpper]) => {
      return Math.max(vec.squareDist(realLower, estLower), vec.squareDist(realUpper, estUpper));
    },
    midpoint: ([aLower, aUpper], [bLower, bUpper]) => {
      return [vec.midpoint(aLower, bLower), vec.midpoint(aUpper, bUpper)];
    },
    onPoint: (x, [[, lower2], [, upper2]]) => {
      const pathsJustCrossed = upper2 < lower2 && !ineqFalse;
      const pathsJustUncrossed = upper2 > lower2 && ineqFalse;
      if (pathsJustCrossed) {
        ineqFalse = true;
        if (upperTmp && lowerTmp) {
          const midX = (prevX + x) / 2;
          const midUpper = (prevUpper + upper2) / 2;
          const midLower = (prevLower + lower2) / 2;
          const midY = (midUpper + midLower) / 2;
          upperTmp += ` ${pointToString(midX, midY)} L `;
          lowerTmp = ` ${pointToString(midX, midY)} L ` + lowerTmp;
          result.fill += ` M ${upperTmp} ${lowerTmp.substring(0, lowerTmp.length - 2)} z `;
          result.upper += ` M ${upperTmp.substring(0, upperTmp.length - 2)} `;
          result.lower += ` M ${lowerTmp.substring(0, lowerTmp.length - 2)} `;
          upperTmp = "";
          lowerTmp = "";
        }
      } else if (pathsJustUncrossed) {
        ineqFalse = false;
        const midX = (prevX + x) / 2;
        const midUpper = (prevUpper + upper2) / 2;
        const midLower = (prevLower + lower2) / 2;
        const midY = (midUpper + midLower) / 2;
        upperTmp += ` ${pointToString(midX, midY)} L `;
        lowerTmp = ` ${pointToString(midX, midY)} L ` + lowerTmp;
      }
      if (!ineqFalse) {
        if (Number.isFinite(upper2)) {
          upperTmp = upperTmp + ` ${pointToString(x, upper2)} L `;
        }
        if (Number.isFinite(lower2)) {
          lowerTmp = ` ${pointToString(x, lower2)} L ` + lowerTmp;
        }
      }
      prevX = x;
      prevUpper = upper2;
      prevLower = lower2;
    }
  });
  if (upperTmp && lowerTmp) {
    result.fill += ` M ${upperTmp} ${lowerTmp.substring(0, lowerTmp.length - 2)} z `;
    result.lower += ` M ${lowerTmp.substring(0, lowerTmp.length - 2)} `;
    result.upper += ` M ${upperTmp.substring(0, upperTmp.length - 2)} `;
  }
  return result;
}

// src/display/Plot/Parametric.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function Parametric({
  xy,
  t,
  color,
  style = "solid",
  weight = 2,
  opacity = 1,
  maxSamplingDepth = 14,
  minSamplingDepth = 8,
  svgPathProps = {}
}) {
  const { viewTransform } = useTransformContext();
  const pixelsPerSquare = -vec.det(viewTransform);
  const [tMin, tMax] = t;
  const errorThreshold = 0.1 / pixelsPerSquare;
  const svgPath = React9.useMemo(
    () => sampleParametric(xy, [tMin, tMax], minSamplingDepth, maxSamplingDepth, errorThreshold),
    [xy, minSamplingDepth, maxSamplingDepth, errorThreshold, tMin, tMax]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "path",
    {
      d: svgPath,
      strokeWidth: weight,
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeDasharray: style === "dashed" ? "1,10" : void 0,
      ...svgPathProps,
      style: {
        stroke: color || "var(--mafs-fg)",
        strokeOpacity: opacity,
        vectorEffect: "non-scaling-stroke",
        transform: "var(--mafs-view-transform)",
        ...svgPathProps.style || {}
      }
    }
  );
}

// src/display/Plot/Simple.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function OfX({ y, ...props }) {
  const {
    xPaneRange: [xMin, xMax]
  } = usePaneContext();
  const xy = React10.useCallback((x) => [x, y(x)], [y]);
  const t = React10.useMemo(() => [xMin, xMax], [xMin, xMax]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Parametric, { xy, t, ...props });
}
function OfY({ x, ...props }) {
  const {
    yPaneRange: [yMin, yMax]
  } = usePaneContext();
  const xy = React10.useCallback((y) => [x(y), y], [x]);
  const t = React10.useMemo(() => [yMin, yMax], [yMin, yMax]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Parametric, { xy, t, ...props });
}

// src/display/Theme.ts
var Theme = {
  foreground: "var(--mafs-fg)",
  background: "var(--mafs-bg)",
  red: "var(--mafs-red)",
  orange: "var(--mafs-orange)",
  green: "var(--mafs-green)",
  blue: "var(--mafs-blue)",
  indigo: "var(--mafs-indigo)",
  violet: "var(--mafs-violet)",
  pink: "var(--mafs-pink)",
  yellow: "var(--mafs-yellow)"
};

// src/display/Plot/VectorField.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var xyOpacityDefault = () => 1;
function VectorField({
  xy,
  step = 1,
  xyOpacity = xyOpacityDefault,
  opacityStep = xyOpacity === xyOpacityDefault ? 1 : 0.2,
  color = Theme.foreground
}) {
  const { viewTransform: pixelMatrix } = useTransformContext();
  const { xPanes, yPanes } = usePaneContext();
  opacityStep = Math.min(1, Math.max(0.01, opacityStep));
  const opacityGrainularity = Math.ceil(1 / opacityStep);
  const layers = generateOpacityLayers(opacityGrainularity);
  function fieldForRegion(xMin, xMax, yMin, yMax) {
    for (let x = Math.floor(xMin); x <= Math.ceil(xMax); x += step) {
      for (let y = Math.floor(yMin); y <= Math.ceil(yMax); y += step) {
        const tail = [x, y];
        const trueOffset = xy([x, y]);
        const trueMag = vec.mag(trueOffset);
        const scaledOffset = vec.scale(vec.normalize(trueOffset), Math.min(trueMag, step * 0.75));
        const tip = vec.add(tail, scaledOffset);
        const pixelTail = vec.transform(tail, pixelMatrix);
        const pixelTipOffset = vec.transform(scaledOffset, pixelMatrix);
        const pixelSize = vec.mag(pixelTipOffset);
        const pixelTip = vec.transform(tip, pixelMatrix);
        const arrowVector = vec.scale(vec.normalize(pixelTipOffset), Math.min(pixelSize, 5));
        const left = vec.add(pixelTip, vec.rotate(arrowVector, 5 / 6 * Math.PI));
        const right = vec.add(pixelTip, vec.rotate(arrowVector, -(5 / 6) * Math.PI));
        const trueOpacity = xyOpacity([x, y]);
        const layer = findClosetLayer(layers, trueOpacity);
        layer.d += ` M ${pixelTail[0]} ${pixelTail[1]} L ${pixelTip[0]} ${pixelTip[1]}  L ${left[0]} ${left[1]}  L ${right[0]} ${right[1]}  L ${pixelTip[0]} ${pixelTip[1]} `;
      }
    }
  }
  for (const [xMin, xMax] of xPanes) {
    for (const [yMin, yMax] of yPanes) {
      fieldForRegion(xMin, xMax, yMin, yMax);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, { children: layers.map((layer, index) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    "path",
    {
      d: layer.d,
      style: {
        stroke: color,
        fill: color,
        opacity: layer.opacity,
        fillOpacity: layer.opacity,
        strokeOpacity: layer.opacity
      },
      strokeLinecap: "round",
      strokeLinejoin: "round"
    },
    index
  )) });
}
function generateOpacityLayers(opacityGrainularity) {
  const layers = [];
  const step = 1 / opacityGrainularity;
  for (let i = 1; i > 0; i -= step) {
    const layer = {
      d: "",
      opacity: i
    };
    layers.push(layer);
  }
  return layers;
}
function findClosetLayer(layers, pointOpacity) {
  pointOpacity = clamp(pointOpacity, 0, 1);
  const index = layers.length - 1 - Math.round(pointOpacity * (layers.length - 1));
  return layers[index];
}

// src/display/Plot/Inequality.tsx
var import_tiny_invariant5 = __toESM(require("tiny-invariant"), 1);
var import_jsx_runtime9 = require("react/jsx-runtime");
function Inequality({
  x,
  y,
  color = Theme.foreground,
  weight = 2,
  strokeColor = color,
  strokeOpacity = 1,
  fillColor = color,
  fillOpacity = 0.15,
  minSamplingDepth = 10,
  maxSamplingDepth = 14,
  upperColor = strokeColor,
  upperOpacity = strokeOpacity,
  upperWeight = weight,
  lowerColor = strokeColor,
  lowerOpacity = strokeOpacity,
  lowerWeight = weight,
  svgUpperPathProps = {},
  svgLowerPathProps = {},
  svgFillPathProps = {}
}) {
  const {
    xPaneRange: [xMin, xMax],
    yPaneRange: [yMin, yMax]
  } = usePaneContext();
  const domain = y ? [xMin, xMax] : [yMin, yMax];
  const range2 = y ? [yMin, yMax] : [xMin, xMax];
  const fn = y ? y : x;
  (0, import_tiny_invariant5.default)(
    fn && x === void 0 !== (y === void 0),
    "You must pass either an x or y set of functions to Inequality (but not both)"
  );
  (0, import_tiny_invariant5.default)(
    (fn["<"] === void 0 || fn["<="] === void 0) && (fn[">"] === void 0 || fn[">="] === void 0),
    "You cannot pass both an inequality and an equality operator to Inequality"
  );
  let upperBoundType = 0 /* UNBOUNDED */;
  if ("<=" in fn)
    upperBoundType = 1 /* EQUAL */;
  if ("<" in fn)
    upperBoundType = 2 /* INEQUAL */;
  let lowerBoundType = 0 /* UNBOUNDED */;
  if (">=" in fn)
    lowerBoundType = 1 /* EQUAL */;
  if (">" in fn)
    lowerBoundType = 2 /* INEQUAL */;
  let greaterFn = fn["<"] ?? fn["<="] ?? (() => range2[1]);
  let lesserFn = fn[">"] ?? fn[">="] ?? (() => range2[0]);
  if (typeof greaterFn === "number") {
    const greater = greaterFn;
    greaterFn = () => greater;
  }
  if (typeof lesserFn === "number") {
    const lesser = lesserFn;
    lesserFn = () => lesser;
  }
  const svgPath = sampleInequality(
    y ? "x" : "y",
    greaterFn,
    lesserFn,
    domain,
    minSamplingDepth,
    maxSamplingDepth,
    0.1
  );
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("g", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "path",
      {
        d: svgPath.fill,
        style: {
          fill: fillColor || "var(--mafs-fg)",
          fillOpacity,
          stroke: "none",
          transform: "var(--mafs-view-transform)",
          vectorEffect: "non-scaling-stroke",
          ...svgFillPathProps?.style
        },
        ...svgFillPathProps
      }
    ),
    upperBoundType != 0 /* UNBOUNDED */ && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "path",
      {
        d: svgPath.upper,
        strokeWidth: upperWeight,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeDasharray: upperBoundType === 2 /* INEQUAL */ ? "4,8" : "",
        style: {
          fill: "none",
          stroke: upperColor,
          strokeOpacity: upperOpacity,
          transform: "var(--mafs-view-transform)",
          vectorEffect: "non-scaling-stroke",
          ...svgUpperPathProps?.style
        },
        ...svgUpperPathProps
      }
    ),
    lowerBoundType != 0 /* UNBOUNDED */ && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "path",
      {
        d: svgPath.lower,
        strokeWidth: lowerWeight,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeDasharray: lowerBoundType === 2 /* INEQUAL */ ? "4,8" : "",
        style: {
          fill: "none",
          stroke: lowerColor,
          strokeOpacity: lowerOpacity,
          transform: "var(--mafs-view-transform)",
          vectorEffect: "non-scaling-stroke",
          ...svgLowerPathProps?.style
        },
        ...svgLowerPathProps
      }
    )
  ] });
}

// src/display/Plot.tsx
var Plot = {
  OfX,
  OfY,
  Parametric,
  VectorField,
  Inequality
};
Plot.OfX.displayName = "Plot.OfX";
Plot.OfY.displayName = "Plot.OfY";
Plot.Parametric.displayName = "Plot.Parametric";
Plot.VectorField.displayName = "Plot.VectorField";
Plot.Inequality.displayName = "Plot.Inequality";

// src/display/Line/ThroughPoints.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function ThroughPoints({
  point1,
  point2,
  color = Theme.foreground,
  style = "solid",
  weight = 2,
  opacity = 1
}) {
  const { xPaneRange, yPaneRange } = usePaneContext();
  const [xMin, xMax] = xPaneRange;
  const [yMin, yMax] = yPaneRange;
  const { userTransform } = useTransformContext();
  const tPoint1 = vec.transform(point1, userTransform);
  const tPoint2 = vec.transform(point2, userTransform);
  const slope = (tPoint2[1] - tPoint1[1]) / (tPoint2[0] - tPoint1[0]);
  let offscreen1;
  let offscreen2;
  if (Math.abs(Math.atan(slope)) > Math.PI / 4) {
    offscreen1 = [(yMin - tPoint1[1]) / slope + tPoint1[0], yMin];
    offscreen2 = [(yMax - tPoint1[1]) / slope + tPoint1[0], yMax];
  } else {
    offscreen1 = [xMin, slope * (xMin - tPoint1[0]) + tPoint1[1]];
    offscreen2 = [xMax, slope * (xMax - tPoint1[0]) + tPoint1[1]];
  }
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "line",
    {
      x1: round(offscreen1[0], 2),
      y1: round(offscreen1[1], 2),
      x2: round(offscreen2[0], 2),
      y2: round(offscreen2[1], 2),
      style: {
        stroke: color,
        transform: "var(--mafs-view-transform)",
        vectorEffect: "non-scaling-stroke"
      },
      strokeWidth: weight,
      opacity,
      strokeDasharray: style === "dashed" ? "4,3" : void 0
    }
  );
}

// src/display/Line/PointAngle.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
function PointAngle({ point, angle, ...rest }) {
  const point2 = vec.add(point, vec.rotate([1, 0], angle));
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ThroughPoints, { point1: point, point2, ...rest });
}

// src/display/Line/PointSlope.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function PointSlope({ point, slope, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(PointAngle, { point, angle: Math.atan(slope), ...rest });
}

// src/display/Line/Segment.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function Segment({
  point1,
  point2,
  color = Theme.foreground,
  style = "solid",
  weight = 2,
  opacity = 1
}) {
  const { viewTransform: pixelMatrix, userTransform } = useTransformContext();
  const transform = vec.matrixMult(pixelMatrix, userTransform);
  const scaledPoint1 = vec.transform(point1, transform);
  const scaledPoint2 = vec.transform(point2, transform);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    "line",
    {
      x1: round(scaledPoint1[0], 2),
      y1: round(scaledPoint1[1], 2),
      x2: round(scaledPoint2[0], 2),
      y2: round(scaledPoint2[1], 2),
      style: { stroke: color },
      strokeWidth: weight,
      opacity,
      strokeDasharray: style === "dashed" ? "1,10" : void 0
    }
  );
}

// src/display/Line.tsx
var Line = {
  PointAngle,
  PointSlope,
  ThroughPoints,
  Segment
};
Line.PointAngle.displayName = "Line.PointAngle";
Line.PointSlope.displayName = "Line.PointSlope";
Line.Segment.displayName = "Line.Segment";
Line.ThroughPoints.displayName = "Line.ThroughPoints";

// src/display/Ellipse.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
function Ellipse({
  center,
  radius,
  angle = 0,
  strokeStyle = "solid",
  strokeOpacity = 1,
  weight = 2,
  color = Theme.foreground,
  fillOpacity = 0.15,
  svgEllipseProps = {}
}) {
  const { viewTransform: toPx, userTransform } = useTransformContext();
  const transform = vec.matrixBuilder().translate(...center).mult(userTransform).scale(1, -1).mult(toPx).scale(1, -1).get();
  const cssTransform = `
    ${vec.toCSS(transform)}
    rotate(${angle * (180 / Math.PI)})
  `;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    "ellipse",
    {
      cx: 0,
      cy: 0,
      rx: radius[0],
      ry: radius[1],
      strokeWidth: weight,
      strokeDasharray: strokeStyle === "dashed" ? "4,3" : void 0,
      transform: cssTransform,
      ...svgEllipseProps,
      style: {
        stroke: color,
        fill: color,
        fillOpacity,
        strokeOpacity,
        vectorEffect: "non-scaling-stroke",
        ...svgEllipseProps.style || {}
      }
    }
  );
}
Ellipse.displayName = "Ellipse";

// src/display/Circle.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function Circle({ radius, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Ellipse, { radius: [radius, radius], ...rest });
}
Circle.displayName = "Circle";

// src/display/PolyBase.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
function PolyBase({
  element: PolyElement,
  points,
  color = Theme.foreground,
  weight = 2,
  fillOpacity = 0.15,
  strokeOpacity = 1,
  strokeStyle = "solid",
  svgPolyProps = {}
}) {
  const { userTransform } = useTransformContext();
  const scaledPoints = points.map((point) => vec.transform(point, userTransform).join(" ")).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    PolyElement,
    {
      points: scaledPoints,
      strokeWidth: weight,
      fillOpacity,
      strokeDasharray: strokeStyle === "dashed" ? "4,3" : void 0,
      strokeLinejoin: "round",
      ...svgPolyProps,
      style: {
        fill: color,
        fillOpacity,
        stroke: color,
        strokeOpacity,
        vectorEffect: "non-scaling-stroke",
        transform: "var(--mafs-view-transform)",
        ...svgPolyProps.style || {}
      }
    }
  );
}

// src/display/Polygon.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function Polygon({ svgPolygonProps, ...otherProps }) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(PolyBase, { element: "polygon", svgPolyProps: svgPolygonProps, ...otherProps });
}
Polygon.displayName = "Polygon";

// src/display/Polyline.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function Polyline({ fillOpacity = 0, svgPolylineProps, ...otherProps }) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    PolyBase,
    {
      element: "polyline",
      fillOpacity,
      svgPolyProps: svgPolylineProps,
      ...otherProps
    }
  );
}
Polyline.displayName = "Polyline";

// src/display/Point.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function Point({
  x,
  y,
  color = Theme.foreground,
  opacity = 1,
  svgCircleProps = {}
}) {
  const { viewTransform: pixelMatrix, userTransform: transform } = useTransformContext();
  const [cx, cy] = vec.transform([x, y], vec.matrixMult(pixelMatrix, transform));
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    "circle",
    {
      cx,
      cy,
      r: 6,
      ...svgCircleProps,
      style: { fill: color, opacity, ...svgCircleProps.style }
    }
  );
}
Point.displayName = "Point";

// src/display/Vector.tsx
var React11 = __toESM(require("react"), 1);
var import_jsx_runtime20 = require("react/jsx-runtime");
var incrementer2 = 0;
function Vector({
  tail = [0, 0],
  tip,
  color = Theme.foreground,
  weight = 2,
  style = "solid",
  opacity = 1,
  svgLineProps = {}
}) {
  const { userTransform, viewTransform } = useTransformContext();
  const combinedTransform = vec.matrixMult(viewTransform, userTransform);
  const pixelTail = vec.transform(tail, combinedTransform);
  const pixelTip = vec.transform(tip, combinedTransform);
  const id = React11.useMemo(() => `mafs-triangle-${incrementer2++}`, []);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_jsx_runtime20.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("marker", { id, markerWidth: "8", markerHeight: "8", refX: "8", refY: "4", orient: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("path", { d: "M 0 0 L 8 4 L 0 8 z", fill: color || "var(--mafs-fg)" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      "line",
      {
        x1: pixelTail[0],
        y1: pixelTail[1],
        x2: pixelTip[0],
        y2: pixelTip[1],
        strokeWidth: weight,
        markerEnd: `url(#${id})`,
        strokeDasharray: style === "dashed" ? "4,3" : void 0,
        ...svgLineProps,
        style: {
          stroke: color || "var(--mafs-fg)",
          strokeOpacity: opacity,
          ...svgLineProps?.style || {},
          vectorEffect: "non-scaling-stroke"
        }
      }
    )
  ] });
}
Vector.displayName = "Vector";

// src/display/Text.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
function Text({
  children,
  x,
  y,
  color,
  size = 30,
  svgTextProps = {},
  attach,
  attachDistance = 0
}) {
  const { viewTransform: pixelMatrix, userTransform: transformContext } = useTransformContext();
  let xOffset = 0;
  let textAnchor = "middle";
  if (attach?.includes("w")) {
    textAnchor = "end";
    xOffset = -1;
  } else if (attach?.includes("e")) {
    textAnchor = "start";
    xOffset = 1;
  }
  let yOffset = 0;
  let dominantBaseline = "middle";
  if (attach?.includes("n")) {
    dominantBaseline = "baseline";
    yOffset = 1;
  } else if (attach?.includes("s")) {
    dominantBaseline = "hanging";
    yOffset = -1;
  }
  let [pixelX, pixelY] = [0, 0];
  if (xOffset !== 0 || yOffset !== 0) {
    ;
    [pixelX, pixelY] = vec.withMag([xOffset, yOffset], attachDistance);
  }
  const center = vec.transform([x, y], vec.matrixMult(pixelMatrix, transformContext));
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    "text",
    {
      x: center[0] + pixelX,
      y: center[1] + pixelY,
      fontSize: size,
      dominantBaseline,
      textAnchor,
      style: {
        fill: color || "var(--mafs-fg)",
        vectorEffect: "non-scaling-stroke"
      },
      className: "mafs-shadow",
      ...svgTextProps,
      children
    }
  );
}
Text.displayName = "Text";

// src/interaction/MovablePoint.tsx
var import_react2 = require("@use-gesture/react");
var React12 = __toESM(require("react"), 1);
var import_tiny_invariant6 = __toESM(require("tiny-invariant"), 1);
var import_jsx_runtime22 = require("react/jsx-runtime");
function MovablePoint({
  point,
  onMove,
  constrain = (point2) => point2,
  color = Theme.pink
}) {
  const { viewTransform, userTransform } = useTransformContext();
  const { xSpan, ySpan } = useSpanContext();
  const inverseViewTransform = vec.matrixInvert(viewTransform);
  (0, import_tiny_invariant6.default)(inverseViewTransform, "The view transform must be invertible.");
  const inverseTransform = React12.useMemo(() => getInverseTransform(userTransform), [userTransform]);
  const combinedTransform = React12.useMemo(
    () => vec.matrixMult(viewTransform, userTransform),
    [viewTransform, userTransform]
  );
  const [dragging, setDragging] = React12.useState(false);
  const [displayX, displayY] = vec.transform(point, combinedTransform);
  const pickup = React12.useRef([0, 0]);
  const ref = React12.useRef(null);
  (0, import_react2.useDrag)(
    (state) => {
      const { type, event } = state;
      event?.stopPropagation();
      const isKeyboard = type.includes("key");
      if (isKeyboard) {
        event?.preventDefault();
        const { direction: yDownDirection, altKey, metaKey, shiftKey } = state;
        const direction = [yDownDirection[0], -yDownDirection[1]];
        const span = Math.abs(direction[0]) ? xSpan : ySpan;
        let divisions = 50;
        if (altKey || metaKey)
          divisions = 200;
        if (shiftKey)
          divisions = 10;
        const min = span / (divisions * 2);
        const tests = range(span / divisions, span / 2, span / divisions);
        for (const dx of tests) {
          const testMovement = vec.scale(direction, dx);
          const testPoint = constrain(
            vec.transform(
              vec.add(vec.transform(point, userTransform), testMovement),
              inverseTransform
            )
          );
          if (vec.dist(testPoint, point) > min) {
            onMove(testPoint);
            break;
          }
        }
      } else {
        const { last, movement: pixelMovement, first } = state;
        setDragging(!last);
        if (first)
          pickup.current = vec.transform(point, userTransform);
        if (vec.mag(pixelMovement) === 0)
          return;
        const movement = vec.transform(pixelMovement, inverseViewTransform);
        onMove(constrain(vec.transform(vec.add(pickup.current, movement), inverseTransform)));
      }
    },
    { target: ref, eventOptions: { passive: false } }
  );
  const ringSize = 15;
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    "g",
    {
      ref,
      style: {
        "--movable-point-color": color,
        "--movable-point-ring-size": `${ringSize}px`
      },
      className: `mafs-movable-point ${dragging ? "mafs-movable-point-dragging" : ""}`,
      tabIndex: 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("circle", { className: "mafs-movable-point-hitbox", r: 30, cx: displayX, cy: displayY }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          "circle",
          {
            className: "mafs-movable-point-focus",
            r: ringSize + 1,
            cx: displayX,
            cy: displayY
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("circle", { className: "mafs-movable-point-ring", r: ringSize, cx: displayX, cy: displayY }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("circle", { className: "mafs-movable-point-point", r: 6, cx: displayX, cy: displayY })
      ]
    }
  );
}
MovablePoint.displayName = "MovablePoint";
function getInverseTransform(transform) {
  const invert = vec.matrixInvert(transform);
  (0, import_tiny_invariant6.default)(
    invert !== null,
    "Could not invert transform matrix. Your movable point's transformation matrix might be degenerative (mapping 2D space to a line)."
  );
  return invert;
}

// src/interaction/useMovablePoint.tsx
var React13 = __toESM(require("react"), 1);
var import_jsx_runtime23 = require("react/jsx-runtime");
function useMovablePoint(initialPoint, { constrain, color = Theme.pink } = {}) {
  const [initialX, initialY] = initialPoint;
  const [point, setPoint] = React13.useState(initialPoint);
  const [x, y] = point;
  const constraintFunction = React13.useMemo(() => {
    if (constrain === "horizontal") {
      return ([x2]) => [x2, initialY];
    } else if (constrain === "vertical") {
      return ([, y2]) => [initialX, y2];
    } else if (typeof constrain === "function") {
      return constrain;
    }
    return ([x2, y2]) => [x2, y2];
  }, [constrain, initialX, initialY]);
  const element = React13.useMemo(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(MovablePoint, { ...{ point, color }, constrain: constraintFunction, onMove: setPoint });
  }, [point, color, constraintFunction]);
  return {
    x,
    y,
    point: [x, y],
    element,
    setPoint
  };
}

// src/animation/useStopwatch.ts
var React14 = __toESM(require("react"), 1);
function useStopwatch(options) {
  const { startTime = 0, endTime = Infinity } = options || {};
  const startClockTime = React14.useRef(null);
  const [time, setTime] = React14.useState(startTime);
  const [playing, setPlaying] = React14.useState(false);
  React14.useEffect(() => {
    let request = -1;
    function tick(now) {
      now = now / 1e3;
      if (!startClockTime.current)
        startClockTime.current = now;
      const deltaTime = now - startClockTime.current;
      if (deltaTime >= endTime) {
        startClockTime.current = null;
        setTime(endTime);
        setPlaying(false);
        return;
      }
      setTime(Math.min(deltaTime, endTime));
      request = window.requestAnimationFrame(tick);
    }
    if (playing) {
      request = window.requestAnimationFrame(tick);
    } else {
      window.cancelAnimationFrame(request);
    }
    return () => window.cancelAnimationFrame(request);
  }, [playing, endTime]);
  const start = React14.useCallback(() => setPlaying(true), []);
  const stop = React14.useCallback(() => {
    startClockTime.current = null;
    setPlaying(false);
    setTime(startTime);
  }, [startTime]);
  return { time, setTime: (time2) => setTime(time2 * 1e3), start, stop };
}

// src/display/Transform.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
function Transform(props) {
  const { userTransform, viewTransform } = useTransformContext();
  let builder = vec.matrixBuilder();
  const { matrix, children, ...transforms } = props;
  if (matrix)
    builder = builder.mult(matrix);
  for (const [name, value] of Object.entries(transforms)) {
    if (value == null)
      continue;
    switch (name) {
      case "translate":
        builder = builder.translate(...value);
        break;
      case "scale":
        if (typeof value === "number")
          builder = builder.scale(value, value);
        else
          builder = builder.scale(...value);
        break;
      case "shear":
        builder = builder.shear(...value);
        break;
      case "rotate":
        builder = builder.rotate(value);
        break;
    }
  }
  builder = builder.mult(userTransform);
  const newUserTransform = builder.get();
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(TransformContext.Provider, { value: { userTransform: newUserTransform, viewTransform }, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("g", { style: { "--mafs-user-transform": vec.toCSS(newUserTransform) }, children }) });
}
Transform.displayName = "Transform";

// src/debug/ViewportInfo.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
function ViewportInfo({ precision = 3 }) {
  const { xMin, xMax, yMin, yMax } = useCoordinateContext();
  const { viewTransform } = useTransformContext();
  const { xPanes, yPanes } = usePaneContext();
  const [x, y] = vec.transform([xMin, yMin], viewTransform);
  const xPanesString = xPanes.map((pane) => `(${pane.join(", ")})`).join("   ");
  const yPanesString = yPanes.map((pane) => `(${pane.join(", ")})`).join("   ");
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("g", { className: "mafs-shadow", fontFamily: "monospace", children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("text", { x: x + 10, y: y - 70, children: [
      "x: (",
      xMin.toFixed(precision),
      ", ",
      xMax.toFixed(precision),
      ")"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("text", { x: x + 10, y: y - 50, children: [
      "y: (",
      yMin.toFixed(precision),
      ", ",
      yMax.toFixed(precision),
      ")"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("text", { x: x + 10, y: y - 30, children: [
      "xPanes: ",
      xPanesString
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("text", { x: x + 10, y: y - 10, children: [
      "yPanes: ",
      yPanesString
    ] })
  ] });
}

// src/debug/TransformWidget.tsx
var import_jsx_runtime26 = require("react/jsx-runtime");
function TransformWidget({ children }) {
  const t = useMovablePoint([0, 0]);
  const s = useMovablePoint([1, 1], { color: Theme.blue });
  const r = useMovablePoint([1, 0], {
    color: Theme.green,
    constrain: (p) => vec.normalize(p)
  });
  const angle = Math.atan2(r.point[1], r.point[0]);
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(import_jsx_runtime26.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(Transform, { translate: t.point, children: [
      /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(Transform, { rotate: angle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(Transform, { scale: s.point, children: [
          children,
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
            Polygon,
            {
              points: [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 0]
              ],
              color: Theme.blue
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          Circle,
          {
            center: [0, 0],
            radius: 1,
            strokeStyle: "dashed",
            strokeOpacity: 0.5,
            fillOpacity: 0,
            color: Theme.green
          }
        ),
        s.element
      ] }),
      r.element
    ] }),
    t.element
  ] });
}

// src/debug/index.tsx
var Debug = {
  ViewportInfo,
  TransformWidget
};
Debug.ViewportInfo.displayName = "Debug.ViewportInfo";
Debug.TransformWidget.displayName = "Debug.TransformWidget";

// src/display/LaTeX.tsx
var React15 = __toESM(require("react"), 1);
var import_katex = __toESM(require("katex"), 1);
var import_jsx_runtime27 = require("react/jsx-runtime");
function LaTeX({ at: center, tex, color = Theme.foreground, katexOptions }) {
  const ref = React15.useRef(null);
  const { viewTransform, userTransform } = useTransformContext();
  const combinedTransform = vec.matrixMult(viewTransform, userTransform);
  const width = 99999;
  const height = 99999;
  React15.useEffect(() => {
    if (!ref.current)
      return;
    import_katex.default.render(tex, ref.current, katexOptions);
  }, [katexOptions, tex]);
  const pixelCenter = vec.add(vec.transform(center, combinedTransform), [-width / 2, -height / 2]);
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
    "foreignObject",
    {
      x: pixelCenter[0],
      y: pixelCenter[1],
      width,
      height,
      pointerEvents: "none",
      children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "div",
        {
          style: {
            fontSize: "1.3em",
            width,
            height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            color,
            textShadow: `, 0 0 2px ${Theme.background}`.repeat(8).slice(2)
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { ref })
        }
      )
    }
  );
}
//# sourceMappingURL=index.js.map
