/* IMPORTANT: Immutable object - `_icons` is not exported and is not
 * to be accessed directly. This ensures if one is mutating this
 * object by accident, other parts of the codebase won't be affected.
 * Should you need to get all of the allowed icons, use `getAllIcons`
 * function as it returns a copy.
 */
const _icons = [
  'SportsRugby',
  'SportsBasketball',
  'Computer',
  'MenuBook',
  'Palette',
  'MusicNote',
  'CameraAlt',
  'LocalFireDepartment',
  'MiscellaneousServices',
];

/* allIcons()
 * @return: a deep copy of the icons
 * */
export const getAllIcons = () => {
  return [..._icons];
};
