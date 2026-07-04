/** Removes `className` so consumers style through documented variant props. */
export type ClosedElementProps<T> = Omit<T, 'className'>;
