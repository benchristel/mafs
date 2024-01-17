/// <reference types="react" />

import { JSX as JSX_2 } from 'react/jsx-runtime';
import { KatexOptions } from 'katex';
import * as React_2 from 'react';

declare type AxisOptions = {
    axis: boolean;
    lines: number | false;
    labels?: false | LabelMaker;
};

export declare type CardinalDirection = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

declare function Cartesian({ xAxis: xAxisOverrides, yAxis: yAxisOverrides, subdivisions, }: CartesianCoordinatesProps): JSX_2.Element;

declare interface CartesianCoordinatesProps {
    xAxis?: GridAxisOptions | false;
    yAxis?: GridAxisOptions | false;
    subdivisions?: number | false;
}

export declare function Circle({ radius, ...rest }: CircleProps): JSX_2.Element;

export declare namespace Circle {
    var displayName: string;
}

export declare interface CircleProps extends Filled {
    center: vec.Vector2;
    radius: number;
    svgEllipseProps?: React_2.SVGProps<SVGEllipseElement>;
}

export declare type ConstraintFunction = (position: vec.Vector2) => vec.Vector2;

declare type ConstraintFunction_2 = (position: vec.Vector2) => vec.Vector2;

export declare const Coordinates: {
    Cartesian: typeof Cartesian;
    Polar: typeof PolarCoordinates;
};

export declare const Debug: {
    ViewportInfo: typeof ViewportInfo;
    TransformWidget: typeof TransformWidget;
};

export declare function Ellipse({ center, radius, angle, strokeStyle, strokeOpacity, weight, color, fillOpacity, svgEllipseProps, }: EllipseProps): JSX_2.Element;

export declare namespace Ellipse {
    var displayName: string;
}

export declare interface EllipseProps extends Filled {
    center: vec.Vector2;
    radius: vec.Vector2;
    angle?: number;
    svgEllipseProps?: React_2.SVGProps<SVGEllipseElement>;
}

export declare interface Filled {
    color?: string;
    weight?: number;
    fillOpacity?: number;
    strokeOpacity?: number;
    strokeStyle?: "solid" | "dashed";
}

declare type FnX = ((x: number) => number) | number;

declare type FnY = ((y: number) => number) | number;

declare type GridAxisOptions = Partial<AxisOptions & {
    subdivisions: number | false;
}>;

declare function Inequality({ x, y, color, weight, strokeColor, strokeOpacity, fillColor, fillOpacity, minSamplingDepth, maxSamplingDepth, upperColor, upperOpacity, upperWeight, lowerColor, lowerOpacity, lowerWeight, svgUpperPathProps, svgLowerPathProps, svgFillPathProps, }: InequalityProps): JSX_2.Element;

declare interface InequalityProps {
    y?: {
        ">"?: FnX;
        "<="?: FnX;
        "<"?: FnX;
        ">="?: FnX;
    };
    x?: {
        ">"?: FnY;
        "<="?: FnY;
        "<"?: FnY;
        ">="?: FnY;
    };
    color?: string;
    weight?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    fillColor?: string;
    fillOpacity?: number;
    minSamplingDepth?: number;
    maxSamplingDepth?: number;
    upperColor?: string;
    upperOpacity?: number;
    upperWeight?: number;
    lowerColor?: string;
    lowerOpacity?: number;
    lowerWeight?: number;
    svgUpperPathProps?: React_2.SVGProps<SVGPathElement>;
    svgLowerPathProps?: React_2.SVGProps<SVGPathElement>;
    svgFillPathProps?: React_2.SVGProps<SVGPathElement>;
}

export declare type Interval = [min: number, max: number];

declare type LabelMaker = (value: number) => React.ReactNode;

export declare function labelPi(x: number): string;

export declare function LaTeX({ at: center, tex, color, katexOptions }: LatexProps): JSX_2.Element;

declare interface LatexProps {
    tex: string;
    at: vec.Vector2;
    color?: string;
    katexOptions?: KatexOptions;
}

export declare const Line: {
    PointAngle: typeof PointAngle;
    PointSlope: typeof PointSlope;
    ThroughPoints: typeof ThroughPoints;
    Segment: typeof Segment;
};

export declare function Mafs({ width: propWidth, height: propHeight, pan, zoom, viewBox, preserveAspectRatio, children, ssr, onClick, }: MafsProps): JSX_2.Element;

export declare namespace Mafs {
    var displayName: string;
}

export declare type MafsProps = React_2.PropsWithChildren<{
    width?: number | "auto";
    height?: number;
    /** Whether to enable panning with the mouse and keyboard */
    pan?: boolean;
    /**
     * Whether to enable zooming with the mouse and keyboard. This can also be an
     * object with `min` and `max` properties to set the scale limits.
     *
     *  * `min` should be in the range (0, 1].
     *  * `max` should be in the range [1, ∞).
     */
    zoom?: boolean | {
        min: number;
        max: number;
    };
    /**
     * A way to declare the "area of interest" of your visualizations. Mafs will center and zoom to
     * this area.
     */
    viewBox?: {
        x?: vec.Vector2;
        y?: vec.Vector2;
        padding?: number;
    };
    /**
     * Whether to squish the graph to fill the Mafs viewport or to preserve the aspect ratio of the
     * coordinate space.
     */
    preserveAspectRatio?: "contain" | false;
    /** Called when the view is clicked on, and passed the point where it was clicked. */
    onClick?: (point: vec.Vector2, event: MouseEvent) => void;
    /**
     * @deprecated this was previously used to avoid rendering Mafs on the server
     * side. However, Mafs now avoids rendering at all until it is mounted, so
     * this prop is now ignored.
     */
    ssr?: boolean;
}>;

export declare function MovablePoint({ point, onMove, constrain, color, }: MovablePointProps): JSX_2.Element;

export declare namespace MovablePoint {
    var displayName: string;
}

export declare interface MovablePointProps {
    /** The current position `[x, y]` of the point. */
    point: vec.Vector2;
    /** A callback that is called as the user moves the point. */
    onMove: (point: vec.Vector2) => void;
    /**
     * Constrain the point to only horizontal movement, vertical movement, or mapped movement.
     *
     * In mapped movement mode, you must provide a function that maps the user's mouse position
     * `[x, y]` to the position the point should "snap" to.
     */
    constrain?: ConstraintFunction_2;
    color?: string;
}

declare function OfX({ y, ...props }: OfXProps): JSX_2.Element;

export declare interface OfXProps extends Omit<ParametricProps, "xy" | "t"> {
    y: (x: number) => number;
    svgPathProps?: React_2.SVGProps<SVGPathElement>;
}

declare function OfY({ x, ...props }: OfYProps): JSX_2.Element;

export declare interface OfYProps extends Omit<ParametricProps, "xy" | "t"> {
    x: (y: number) => number;
    svgPathProps?: React_2.SVGProps<SVGPathElement>;
}

declare interface PaneContextShape {
    xPanes: Interval[];
    yPanes: Interval[];
    xPaneRange: Interval;
    yPaneRange: Interval;
}

declare interface PaneVisualizerProps {
    /** The number of decimal places to which to round the displayed values. */
    precision?: number;
}

declare function Parametric({ xy, t, color, style, weight, opacity, maxSamplingDepth, minSamplingDepth, svgPathProps, }: ParametricProps): JSX_2.Element;

export declare interface ParametricProps extends Stroked {
    /** A function that takes a `t` value and returns a point. */
    xy: (t: number) => vec.Vector2;
    /** The domain `t` between which to evaluate `xy`. */
    t: vec.Vector2;
    /** The minimum recursive depth of the sampling algorithm. */
    minSamplingDepth?: number;
    /** The maximum recursive depth of the sampling algorithm. */
    maxSamplingDepth?: number;
    svgPathProps?: React_2.SVGProps<SVGPathElement>;
}

export declare const Plot: {
    OfX: typeof OfX;
    OfY: typeof OfY;
    Parametric: typeof Parametric;
    VectorField: typeof VectorField;
    Inequality: typeof Inequality;
};

export declare function Point({ x, y, color, opacity, svgCircleProps, }: PointProps): JSX_2.Element;

export declare namespace Point {
    var displayName: string;
}

declare function PointAngle({ point, angle, ...rest }: PointAngleProps): JSX_2.Element;

export declare interface PointAngleProps extends Stroked {
    point: vec.Vector2;
    angle: number;
}

export declare interface PointProps {
    x: number;
    y: number;
    color?: string;
    opacity?: number;
    svgCircleProps?: React_2.SVGProps<SVGCircleElement>;
}

declare function PointSlope({ point, slope, ...rest }: PointSlopeProps): JSX_2.Element;

export declare interface PointSlopeProps extends Stroked {
    point: vec.Vector2;
    slope: number;
}

declare function PolarCoordinates({ xAxis: xAxisOverrides, yAxis: yAxisOverrides, lines, subdivisions, }: PolarCoordinatesProps): JSX_2.Element;

declare interface PolarCoordinatesProps {
    xAxis?: Partial<AxisOptions> | false;
    yAxis?: Partial<AxisOptions> | false;
    lines?: number;
    subdivisions?: number;
}

declare interface PolyBaseProps extends Filled {
    points: vec.Vector2[];
}

export declare function Polygon({ svgPolygonProps, ...otherProps }: PolygonProps): JSX_2.Element;

export declare namespace Polygon {
    var displayName: string;
}

export declare interface PolygonProps extends PolyBaseProps {
    svgPolygonProps?: React_2.SVGProps<SVGPolygonElement>;
}

export declare function Polyline({ fillOpacity, svgPolylineProps, ...otherProps }: PolylineProps): JSX_2.Element;

export declare namespace Polyline {
    var displayName: string;
}

export declare interface PolylineProps extends PolyBaseProps {
    svgPolylineProps?: React_2.SVGProps<SVGPolylineElement>;
}

declare function Segment({ point1, point2, color, style, weight, opacity, }: SegmentProps): JSX_2.Element;

export declare interface SegmentProps extends Stroked {
    point1: vec.Vector2;
    point2: vec.Vector2;
}

export declare interface Stopwatch {
    /**
     * The amount of time that has passed since the timer started, in high-precision seconds.
     */
    time: number;
    /** Starts the timer (resumes the timer if paused) */
    start: () => void;
    /** Stops and resets the timer. */
    stop: () => void;
    /** Sets the current time to a certain value.
     * @throws an error if the time is outside of the given range.
     */
    setTime: (time: number) => void;
}

export declare interface StopwatchArguments {
    /** The start time in seconds */
    startTime?: number;
    /** The end time in seconds */
    endTime?: number;
}

export declare interface Stroked {
    color?: string;
    opacity?: number;
    weight?: number;
    style?: "solid" | "dashed";
}

declare function Text_2({ children, x, y, color, size, svgTextProps, attach, attachDistance, }: TextProps): JSX_2.Element;

declare namespace Text_2 {
    var displayName: string;
}
export { Text_2 as Text }

export declare type TextProps = React_2.PropsWithChildren<{
    x: number;
    y: number;
    attach?: CardinalDirection;
    attachDistance?: number;
    size?: number;
    color?: string;
    svgTextProps?: React_2.SVGAttributes<SVGTextElement>;
}>;

export declare const Theme: {
    foreground: string;
    background: string;
    red: string;
    orange: string;
    green: string;
    blue: string;
    indigo: string;
    violet: string;
    pink: string;
    yellow: string;
};

declare function ThroughPoints({ point1, point2, color, style, weight, opacity, }: ThroughPointsProps): JSX_2.Element;

export declare interface ThroughPointsProps extends Stroked {
    point1: vec.Vector2;
    point2: vec.Vector2;
}

export declare function Transform(props: TransformProps): JSX_2.Element;

export declare namespace Transform {
    var displayName: string;
}

declare interface TransformContextShape {
    /**
     * The resulting transformation matrix from any user-provided transforms (via
     * the `<Transform />` component).
     */
    userTransform: vec.Matrix;
    /**
     * A transformation that maps "math" space to pixel space. Note that, in many
     * cases, you don't need to use this transformation directly. Instead, use the
     * `var(--mafs-view-transform)` CSS custom property in combination with the
     * SVG `transform` prop.
     */
    viewTransform: vec.Matrix;
}

export declare type TransformProps = React_2.PropsWithChildren<{
    matrix?: vec.Matrix;
    translate?: vec.Vector2;
    scale?: number | vec.Vector2;
    rotate?: number;
    shear?: vec.Vector2;
}>;

declare function TransformWidget({ children }: TransformWidgetProps): JSX_2.Element;

declare interface TransformWidgetProps {
    /** The components to transform */
    children: React_2.ReactNode;
}

export declare interface UseMovablePoint {
    x: number;
    y: number;
    point: vec.Vector2;
    element: React_2.ReactElement;
    setPoint: (point: vec.Vector2) => void;
}

export declare function useMovablePoint(initialPoint: vec.Vector2, { constrain, color }?: UseMovablePointArguments): UseMovablePoint;

export declare interface UseMovablePointArguments {
    color?: string;
    /**
     * Constrain the point to only horizontal movement, vertical movement, or mapped movement.
     *
     * In mapped movement mode, you must provide a function that maps the user's attempted position
     * (x, y) to the position the point should "snap" to.
     */
    constrain?: "horizontal" | "vertical" | ConstraintFunction;
}

export declare function usePaneContext(): PaneContextShape;

export declare function useStopwatch(options?: StopwatchArguments): Stopwatch;

/**
 * A hook that returns the current transformation context. This is useful for
 * building custom Mafs components that need to be aware of how to map between
 * world space and pixel space, and also need to respond to user-provided
 * transformations.
 */
export declare function useTransformContext(): TransformContextShape;

export declare namespace vec {
    /**
     * @fileinfo
     *
     * Mafs' internal linear algebra functions.
     *
     * A lot of the code here was adapted from [vec-la](https://github.com/francisrstokes/vec-la) 1.4.0,
     * which was released under the MIT license.
     */
    /**
     * A two-dimensional vector
     */
    export type Vector2 = [x: number, y: number];
    /**
     * A 2x3 representation of a 3x3 matrix used to transform and translate a
     * two-dimensional vector.
     */
    export type Matrix = [number, number, number, number, number, number];
    /**
     * Add two vectors
     */
    export function add(v: Vector2, v2: Vector2): Vector2;
    /**
     * Subtract one vector from another
     */
    export function sub(v: Vector2, v2: Vector2): Vector2;
    /**
     * Get the magnitude of a vector
     */
    export function mag(v: Vector2): number;
    /**
     * Get the normal vector of a vector
     */
    export function normal(v: Vector2): Vector2;
    /**
     * Linear interpolation between two vectors
     */
    export function lerp(v1: Vector2, v2: Vector2, t: number): Vector2;
    export function withMag(v: Vector2, m: number): Vector2;
    /**
     * Return a normalized version of a vector
     */
    export function normalize(v: Vector2): Vector2;
    /**
     * Scale a vector by a scalar
     */
    export function scale(v: Vector2, sc: number): Vector2;
    /**
     * Apply a matrix transformation to a vector
     */
    export function transform(v: Vector2, m: Matrix): Vector2;
    /**
     * Multiply two matrices (compose 2D transformations)
     */
    export function matrixMult(m: Matrix, m2: Matrix): Matrix;
    /**
     * Rotates a vector around the origin. Shorthand for a rotation matrix
     */
    export function rotate(v: Vector2, a: number): Vector2;
    /**
     * Rotates a vector around a given point.
     */
    export function rotateAbout(v: Vector2, cp: Vector2, a: number): Vector2;
    /**
     * Gets the midpoint of two vectors
     */
    export function midpoint(v: Vector2, v2: Vector2): Vector2;
    /**
     * Gets the distance between two vectors
     */
    export function dist(v: Vector2, v2: Vector2): number;
    /**
     * Get the square distance between two vectors
     */
    export function squareDist(v: Vector2, v2: Vector2): number;
    /**
     * Dot product of two vectors
     */
    export function dot(v: Vector2, v2: Vector2): number;
    /**
     * Determinant of a matrix
     */
    export function det(m: Matrix): number;
    /**
     * Inverts a 3x3 matrix, returning null if the determinant is zero
     * (indicating a degenerate transformation)
     */
    export function matrixInvert(a: Matrix): Matrix | null;
    /**
     * Returns a builder object for easily creating a matrix from several transformations.
     *
     * ```ts
     * const matrix =
     *   vec.matrixBuilder().translate(10, 10).scale(2).get()
     * ```
     *
     * An existing matrix can also be passed in to start with.
     */
    export function matrixBuilder(m?: Matrix | null): {
        mult: (m: Matrix) => any;
        translate: (x: number, y: number) => any;
        rotate: (a: number) => any;
        scale: (x: number, y: number) => any;
        shear: (x: number, y: number) => any;
        get: () => Matrix;
    };
    /**
     * Represent a matrix as a CSS transform `matrix(...)` string
     */
    export function toCSS(matrix: Matrix): string;
    const identity: Matrix;
}

export declare function Vector({ tail, tip, color, weight, style, opacity, svgLineProps, }: VectorProps): JSX_2.Element;

export declare namespace Vector {
    var displayName: string;
}

declare function VectorField({ xy, step, xyOpacity, opacityStep, color, }: VectorFieldProps): JSX_2.Element;

export declare interface VectorFieldProps {
    xy: (point: vec.Vector2) => vec.Vector2;
    xyOpacity?: (point: vec.Vector2) => number;
    step: number;
    opacityStep?: number;
    color?: string;
}

export declare interface VectorProps extends Stroked {
    tail?: vec.Vector2;
    tip: vec.Vector2;
    svgLineProps?: React_2.SVGProps<SVGLineElement>;
}

declare function ViewportInfo({ precision }: PaneVisualizerProps): JSX_2.Element;

export { }
