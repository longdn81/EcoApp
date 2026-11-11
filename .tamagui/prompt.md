# Tamagui Configuration

This document provides an overview of the Tamagui configuration for this project.

## Configuration Settings

**IMPORTANT:** These settings affect how you write Tamagui code in this project.

### Default Font: `body`

All text components will use the "body" font family by default.

### Only Allow Shorthands: `true`

**You MUST use shorthand properties in this project.**

Full property names are not allowed. For example:
- ✅ `<View w="10" />` (correct)
- ❌ `<View width="10" />` (will error)

See the Shorthand Properties section below for all available shorthands.

### Style value syntax

Both string and object style value syntax are allowed.

### Theme Class Name: `html`

Theme classes are applied to the root HTML element.

### Allowed Style Values

Type validation: `"somewhat-strict-web"`.

Single-token values are type-checked. Run `tamagui check --strict` to also validate conditional payloads.

## Flat Value Grammar

Conditional style values follow this grammar:

```txt
value  := base? clause*
clause := modifier(:modifier)*:payload
```

- No `$` sigils: bare token names (`bg="background"`, not `bg="$background"`).
- Kebab-case theme names: `background-hover`, `border-color`, `shadow-color`.
- Numbers are px: `p={4}` is 4px, while `p="4"` is space token 4.
- Specificity precedence: platform (`ios:` > `native:` > bare) > condition count > category (media < container < theme < group < state).

Both forms are allowed:

```tsx
// string form
<View background="background hover:background-hover dark:blue-500" p="4 sm:6 max-sm:2" />

// object form
<View background={{ default: 'background', hover: 'background-hover', dark: 'blue-500' }} p={{ default: '4', sm: '6', 'max-sm': '2' }} />
```

## Shorthand Properties

These shorthand properties are available for styling:

- `b` → `bottom`
- `bg` → `backgroundColor`
- `content` → `alignContent`
- `grow` → `flexGrow`
- `items` → `alignItems`
- `justify` → `justifyContent`
- `l` → `left`
- `m` → `margin`
- `maxH` → `maxHeight`
- `maxW` → `maxWidth`
- `mb` → `marginBottom`
- `minH` → `minHeight`
- `minW` → `minWidth`
- `ml` → `marginLeft`
- `mr` → `marginRight`
- `mt` → `marginTop`
- `mx` → `marginHorizontal`
- `my` → `marginVertical`
- `p` → `padding`
- `pb` → `paddingBottom`
- `pl` → `paddingLeft`
- `pr` → `paddingRight`
- `pt` → `paddingTop`
- `px` → `paddingHorizontal`
- `py` → `paddingVertical`
- `r` → `right`
- `rounded` → `borderRadius`
- `select` → `userSelect`
- `self` → `alignSelf`
- `shrink` → `flexShrink`
- `t` → `top`
- `text` → `textAlign`
- `z` → `zIndex`

## Themes

- `dark`
- `dark_Button`
- `dark_Input`
- `dark_Progress`
- `dark_ProgressIndicator`
- `dark_Slider`
- `dark_SliderActive`
- `dark_SliderThumb`
- `dark_Switch`
- `dark_SwitchThumb`
- `dark_TextArea`
- `dark_Tooltip`
- `dark_accent`
- `dark_black`
- `dark_black_Button`
- `dark_black_Input`
- `dark_black_Progress`
- `dark_black_ProgressIndicator`
- `dark_black_Slider`
- `dark_black_SliderActive`
- `dark_black_SliderThumb`
- `dark_black_Switch`
- `dark_black_SwitchThumb`
- `dark_black_TextArea`
- `dark_black_Tooltip`
- `dark_black_accent`
- `dark_black_surface1`
- `dark_black_surface2`
- `dark_blue`
- `dark_blue_Button`
- `dark_blue_Input`
- `dark_blue_Progress`
- `dark_blue_ProgressIndicator`
- `dark_blue_Slider`
- `dark_blue_SliderActive`
- `dark_blue_SliderThumb`
- `dark_blue_Switch`
- `dark_blue_SwitchThumb`
- `dark_blue_TextArea`
- `dark_blue_Tooltip`
- `dark_blue_accent`
- `dark_blue_surface1`
- `dark_blue_surface2`
- `dark_gray`
- `dark_gray_Button`
- `dark_gray_Input`
- `dark_gray_Progress`
- `dark_gray_ProgressIndicator`
- `dark_gray_Slider`
- `dark_gray_SliderActive`
- `dark_gray_SliderThumb`
- `dark_gray_Switch`
- `dark_gray_SwitchThumb`
- `dark_gray_TextArea`
- `dark_gray_Tooltip`
- `dark_gray_accent`
- `dark_gray_surface1`
- `dark_gray_surface2`
- `dark_green`
- `dark_green_Button`
- `dark_green_Input`
- `dark_green_Progress`
- `dark_green_ProgressIndicator`
- `dark_green_Slider`
- `dark_green_SliderActive`
- `dark_green_SliderThumb`
- `dark_green_Switch`
- `dark_green_SwitchThumb`
- `dark_green_TextArea`
- `dark_green_Tooltip`
- `dark_green_accent`
- `dark_green_surface1`
- `dark_green_surface2`
- `dark_neutral`
- `dark_neutral_Button`
- `dark_neutral_Input`
- `dark_neutral_Progress`
- `dark_neutral_ProgressIndicator`
- `dark_neutral_Slider`
- `dark_neutral_SliderActive`
- `dark_neutral_SliderThumb`
- `dark_neutral_Switch`
- `dark_neutral_SwitchThumb`
- `dark_neutral_TextArea`
- `dark_neutral_Tooltip`
- `dark_neutral_accent`
- `dark_neutral_surface1`
- `dark_neutral_surface2`
- `dark_orange`
- `dark_orange_Button`
- `dark_orange_Input`
- `dark_orange_Progress`
- `dark_orange_ProgressIndicator`
- `dark_orange_Slider`
- `dark_orange_SliderActive`
- `dark_orange_SliderThumb`
- `dark_orange_Switch`
- `dark_orange_SwitchThumb`
- `dark_orange_TextArea`
- `dark_orange_Tooltip`
- `dark_orange_accent`
- `dark_orange_surface1`
- `dark_orange_surface2`
- `dark_pink`
- `dark_pink_Button`
- `dark_pink_Input`
- `dark_pink_Progress`
- `dark_pink_ProgressIndicator`
- `dark_pink_Slider`
- `dark_pink_SliderActive`
- `dark_pink_SliderThumb`
- `dark_pink_Switch`
- `dark_pink_SwitchThumb`
- `dark_pink_TextArea`
- `dark_pink_Tooltip`
- `dark_pink_accent`
- `dark_pink_surface1`
- `dark_pink_surface2`
- `dark_purple`
- `dark_purple_Button`
- `dark_purple_Input`
- `dark_purple_Progress`
- `dark_purple_ProgressIndicator`
- `dark_purple_Slider`
- `dark_purple_SliderActive`
- `dark_purple_SliderThumb`
- `dark_purple_Switch`
- `dark_purple_SwitchThumb`
- `dark_purple_TextArea`
- `dark_purple_Tooltip`
- `dark_purple_accent`
- `dark_purple_surface1`
- `dark_purple_surface2`
- `dark_red`
- `dark_red_Button`
- `dark_red_Input`
- `dark_red_Progress`
- `dark_red_ProgressIndicator`
- `dark_red_Slider`
- `dark_red_SliderActive`
- `dark_red_SliderThumb`
- `dark_red_Switch`
- `dark_red_SwitchThumb`
- `dark_red_TextArea`
- `dark_red_Tooltip`
- `dark_red_accent`
- `dark_red_surface1`
- `dark_red_surface2`
- `dark_surface1`
- `dark_surface2`
- `dark_teal`
- `dark_teal_Button`
- `dark_teal_Input`
- `dark_teal_Progress`
- `dark_teal_ProgressIndicator`
- `dark_teal_Slider`
- `dark_teal_SliderActive`
- `dark_teal_SliderThumb`
- `dark_teal_Switch`
- `dark_teal_SwitchThumb`
- `dark_teal_TextArea`
- `dark_teal_Tooltip`
- `dark_teal_accent`
- `dark_teal_surface1`
- `dark_teal_surface2`
- `dark_white`
- `dark_white_Button`
- `dark_white_Input`
- `dark_white_Progress`
- `dark_white_ProgressIndicator`
- `dark_white_Slider`
- `dark_white_SliderActive`
- `dark_white_SliderThumb`
- `dark_white_Switch`
- `dark_white_SwitchThumb`
- `dark_white_TextArea`
- `dark_white_Tooltip`
- `dark_white_accent`
- `dark_white_surface1`
- `dark_white_surface2`
- `dark_yellow`
- `dark_yellow_Button`
- `dark_yellow_Input`
- `dark_yellow_Progress`
- `dark_yellow_ProgressIndicator`
- `dark_yellow_Slider`
- `dark_yellow_SliderActive`
- `dark_yellow_SliderThumb`
- `dark_yellow_Switch`
- `dark_yellow_SwitchThumb`
- `dark_yellow_TextArea`
- `dark_yellow_Tooltip`
- `dark_yellow_accent`
- `dark_yellow_surface1`
- `dark_yellow_surface2`
- `light`
- `light_Button`
- `light_Input`
- `light_Progress`
- `light_ProgressIndicator`
- `light_Slider`
- `light_SliderActive`
- `light_SliderThumb`
- `light_Switch`
- `light_SwitchThumb`
- `light_TextArea`
- `light_Tooltip`
- `light_accent`
- `light_black`
- `light_black_Button`
- `light_black_Input`
- `light_black_Progress`
- `light_black_ProgressIndicator`
- `light_black_Slider`
- `light_black_SliderActive`
- `light_black_SliderThumb`
- `light_black_Switch`
- `light_black_SwitchThumb`
- `light_black_TextArea`
- `light_black_Tooltip`
- `light_black_accent`
- `light_black_surface1`
- `light_black_surface2`
- `light_blue`
- `light_blue_Button`
- `light_blue_Input`
- `light_blue_Progress`
- `light_blue_ProgressIndicator`
- `light_blue_Slider`
- `light_blue_SliderActive`
- `light_blue_SliderThumb`
- `light_blue_Switch`
- `light_blue_SwitchThumb`
- `light_blue_TextArea`
- `light_blue_Tooltip`
- `light_blue_accent`
- `light_blue_surface1`
- `light_blue_surface2`
- `light_gray`
- `light_gray_Button`
- `light_gray_Input`
- `light_gray_Progress`
- `light_gray_ProgressIndicator`
- `light_gray_Slider`
- `light_gray_SliderActive`
- `light_gray_SliderThumb`
- `light_gray_Switch`
- `light_gray_SwitchThumb`
- `light_gray_TextArea`
- `light_gray_Tooltip`
- `light_gray_accent`
- `light_gray_surface1`
- `light_gray_surface2`
- `light_green`
- `light_green_Button`
- `light_green_Input`
- `light_green_Progress`
- `light_green_ProgressIndicator`
- `light_green_Slider`
- `light_green_SliderActive`
- `light_green_SliderThumb`
- `light_green_Switch`
- `light_green_SwitchThumb`
- `light_green_TextArea`
- `light_green_Tooltip`
- `light_green_accent`
- `light_green_surface1`
- `light_green_surface2`
- `light_neutral`
- `light_neutral_Button`
- `light_neutral_Input`
- `light_neutral_Progress`
- `light_neutral_ProgressIndicator`
- `light_neutral_Slider`
- `light_neutral_SliderActive`
- `light_neutral_SliderThumb`
- `light_neutral_Switch`
- `light_neutral_SwitchThumb`
- `light_neutral_TextArea`
- `light_neutral_Tooltip`
- `light_neutral_accent`
- `light_neutral_surface1`
- `light_neutral_surface2`
- `light_orange`
- `light_orange_Button`
- `light_orange_Input`
- `light_orange_Progress`
- `light_orange_ProgressIndicator`
- `light_orange_Slider`
- `light_orange_SliderActive`
- `light_orange_SliderThumb`
- `light_orange_Switch`
- `light_orange_SwitchThumb`
- `light_orange_TextArea`
- `light_orange_Tooltip`
- `light_orange_accent`
- `light_orange_surface1`
- `light_orange_surface2`
- `light_pink`
- `light_pink_Button`
- `light_pink_Input`
- `light_pink_Progress`
- `light_pink_ProgressIndicator`
- `light_pink_Slider`
- `light_pink_SliderActive`
- `light_pink_SliderThumb`
- `light_pink_Switch`
- `light_pink_SwitchThumb`
- `light_pink_TextArea`
- `light_pink_Tooltip`
- `light_pink_accent`
- `light_pink_surface1`
- `light_pink_surface2`
- `light_purple`
- `light_purple_Button`
- `light_purple_Input`
- `light_purple_Progress`
- `light_purple_ProgressIndicator`
- `light_purple_Slider`
- `light_purple_SliderActive`
- `light_purple_SliderThumb`
- `light_purple_Switch`
- `light_purple_SwitchThumb`
- `light_purple_TextArea`
- `light_purple_Tooltip`
- `light_purple_accent`
- `light_purple_surface1`
- `light_purple_surface2`
- `light_red`
- `light_red_Button`
- `light_red_Input`
- `light_red_Progress`
- `light_red_ProgressIndicator`
- `light_red_Slider`
- `light_red_SliderActive`
- `light_red_SliderThumb`
- `light_red_Switch`
- `light_red_SwitchThumb`
- `light_red_TextArea`
- `light_red_Tooltip`
- `light_red_accent`
- `light_red_surface1`
- `light_red_surface2`
- `light_surface1`
- `light_surface2`
- `light_teal`
- `light_teal_Button`
- `light_teal_Input`
- `light_teal_Progress`
- `light_teal_ProgressIndicator`
- `light_teal_Slider`
- `light_teal_SliderActive`
- `light_teal_SliderThumb`
- `light_teal_Switch`
- `light_teal_SwitchThumb`
- `light_teal_TextArea`
- `light_teal_Tooltip`
- `light_teal_accent`
- `light_teal_surface1`
- `light_teal_surface2`
- `light_white`
- `light_white_Button`
- `light_white_Input`
- `light_white_Progress`
- `light_white_ProgressIndicator`
- `light_white_Slider`
- `light_white_SliderActive`
- `light_white_SliderThumb`
- `light_white_Switch`
- `light_white_SwitchThumb`
- `light_white_TextArea`
- `light_white_Tooltip`
- `light_white_accent`
- `light_white_surface1`
- `light_white_surface2`
- `light_yellow`
- `light_yellow_Button`
- `light_yellow_Input`
- `light_yellow_Progress`
- `light_yellow_ProgressIndicator`
- `light_yellow_Slider`
- `light_yellow_SliderActive`
- `light_yellow_SliderThumb`
- `light_yellow_Switch`
- `light_yellow_SwitchThumb`
- `light_yellow_TextArea`
- `light_yellow_Tooltip`
- `light_yellow_accent`
- `light_yellow_surface1`
- `light_yellow_surface2`

Theme names above are exact configured names. Nested themes resolve relative to their parent. Use an explicit theme boundary in a component skin.

### Theme Usage

```tsx
<Theme name="dark">
  <Button>Uses this theme</Button>
</Theme>
```

**Accessing theme values:**

Components access theme values by their bare names:

```tsx
// string form
<View background="background hover:background-hover" color="color" />

// object form
<View background={{ default: 'background', hover: 'background-hover' }} color={{ default: 'color' }} />
```

**Special props:**

- `theme="inverse"`: Uses the opposite light or dark sub-theme
## Tokens

Tokens are design system values referenced by their bare names.

### Space Tokens

- `-20`: -186
- `-19`: -172
- `-18`: -158
- `-17`: -144
- `-16`: -144
- `-15`: -130
- `-14`: -116
- `-13`: -102
- `-12`: -88
- `-11`: -74
- `-10`: -60
- `-9`: -53
- `-8`: -46
- `-7`: -39
- `-6`: -32
- `-5`: -24
- `-4`: -18
- `-4-5`: -21
- `-3`: -13
- `-3-5`: -16
- `-2`: -7
- `-2-5`: -10
- `-1`: -2
- `-1-5`: -4
- `0`: 0
- `0-25`: 0.5
- `0-5`: 1
- `0-75`: 1.5
- `-0-25`: -0.5
- `-0-5`: -1
- `-0-75`: -1.5
- `1`: 2
- `1-5`: 4
- `2`: 7
- `2-5`: 10
- `3`: 13
- `3-5`: 16
- `4`: 18
- `4-5`: 21
- `5`: 24
- `6`: 32
- `7`: 39
- `8`: 46
- `9`: 53
- `10`: 60
- `11`: 74
- `12`: 88
- `13`: 102
- `14`: 116
- `15`: 130
- `16`: 144
- `17`: 144
- `18`: 158
- `19`: 172
- `20`: 186

### Size Tokens

- `0`: 0
- `0-25`: 2
- `0-5`: 4
- `0-75`: 8
- `1`: 20
- `1-5`: 24
- `2`: 28
- `2-5`: 32
- `3`: 36
- `3-5`: 40
- `4`: 44
- `4-5`: 48
- `5`: 52
- `6`: 64
- `7`: 74
- `8`: 84
- `9`: 94
- `10`: 104
- `11`: 124
- `12`: 144
- `13`: 164
- `14`: 184
- `15`: 204
- `16`: 224
- `17`: 224
- `18`: 244
- `19`: 264
- `20`: 284

### Radius Tokens

- `0`: 0
- `1`: 3
- `2`: 5
- `3`: 7
- `4`: 9
- `5`: 10
- `6`: 16
- `7`: 19
- `8`: 22
- `9`: 26
- `10`: 34
- `11`: 42
- `12`: 50

### Z-Index Tokens

- `0`: 0
- `1`: 100
- `2`: 200
- `3`: 300
- `4`: 400
- `5`: 500

### Token Usage

Tokens can be used in component props by their bare names:

```tsx
// String form
<View p="4 sm:6" width="10 sm:12" background="background" />

// Object form
<View p={{ default: '4', sm: '6' }} width={{ default: '10', sm: '12' }} background={{ default: 'background' }} />

// Space and radius tokens
<View gap="2" m="3" height="6" rounded="0" />
```

## Media Queries

Available responsive breakpoints:

- **height-lg**: min-height: 1024px (screens >= 1024px tall)
- **height-md**: min-height: 768px (screens >= 768px tall)
- **height-sm**: min-height: 640px (screens >= 640px tall)
- **hoverable**: pointer: hover (hover)
- **lg**: min-width: 1024px (screens >= 1024px wide)
- **max-100**: max-width: 99.98px (screens <= 99.98px wide)
- **max-200**: max-width: 199.98px (screens <= 199.98px wide)
- **max-height-100**: max-height: 99.98px (screens <= 99.98px tall)
- **max-height-200**: max-height: 199.98px (screens <= 199.98px tall)
- **max-height-lg**: max-height: 1023.98px (screens <= 1023.98px tall)
- **max-height-md**: max-height: 767.98px (screens <= 767.98px tall)
- **max-height-sm**: max-height: 639.98px (screens <= 639.98px tall)
- **max-height-xs**: max-height: 459.98px (screens <= 459.98px tall)
- **max-height-xxs**: max-height: 339.98px (screens <= 339.98px tall)
- **max-height-xxxs**: max-height: 259.98px (screens <= 259.98px tall)
- **max-lg**: max-width: 1023.98px (screens <= 1023.98px wide)
- **max-md**: max-width: 767.98px (screens <= 767.98px wide)
- **max-sm**: max-width: 639.98px (screens <= 639.98px wide)
- **max-xl**: max-width: 1279.98px (screens <= 1279.98px wide)
- **max-xs**: max-width: 459.98px (screens <= 459.98px wide)
- **max-xxl**: max-width: 1535.98px (screens <= 1535.98px wide)
- **max-xxs**: max-width: 339.98px (screens <= 339.98px wide)
- **max-xxxs**: max-width: 259.98px (screens <= 259.98px wide)
- **md**: min-width: 768px (screens >= 768px wide)
- **sm**: min-width: 640px (screens >= 640px wide)
- **touchable**: pointer: coarse
- **xl**: min-width: 1280px (screens >= 1280px wide)
- **xs**: min-width: 460px (screens >= 460px wide)
- **xxl**: min-width: 1536px (screens >= 1536px wide)
- **xxs**: min-width: 340px (screens >= 340px wide)
- **xxxs**: min-width: 260px (screens >= 260px wide)

### Media Query Usage

Media queries can be used as style props or with the `useMedia` hook:

```tsx
// String form and object form
<View width="100% md:50%" />
<View width={{ default: '100%', 'md': '50%' }} />

// Using the useMedia hook
const media = useMedia()
if (media.md) {
  // Render for this breakpoint
}
```

## Fonts

Available font families:

- body
- heading

## Animations

Available animation presets:



## Components

Available named exports (import these names directly):

- ACTIONS
- Accordion
- Adapt
- AdaptCapabilities
- AdaptContents
- AdaptParent
- AdaptPortalContents
- AlertDialog
- AlertDialogAction
- AlertDialogCancel
- AlertDialogContent
- AlertDialogDescription
- AlertDialogDestructive
- AlertDialogOverlay
- AlertDialogPortal
- AlertDialogTitle
- AlertDialogTrigger
- Anchor
- Animate
- AnimatePresence
- Avatar
- AvatarFallback
- AvatarImage
- Button
- ButtonIcon
- ButtonText
- Card
- CardBackground
- CardFooter
- CardHeader
- Checkbox
- CheckboxIndicator
- Circle
- ClientOnly
- Collapsible
- CollapsibleContent
- CollapsibleTrigger
- Configuration
- ContextMenu
- Dialog
- DialogClose
- DialogContent
- DialogDescription
- DialogOverlay
- DialogPortal
- DialogTitle
- DialogTrigger
- Em
- EnsureFlexed
- Field
- FieldDescriptionFrame
- FieldErrorFrame
- FieldItemFrame
- FieldLabelFrame
- Fieldset
- FontLanguage
- Form
- FormTrigger
- Group
- H1
- H2
- H3
- H4
- H5
- H6
- Heading
- INITIAL_STATE
- Image
- Input
- Label
- ListItem
- ListItemSubtitle
- ListItemText
- ListItemTitle
- Menu
- Paragraph
- Popover
- PopoverAnchor
- PopoverArrow
- PopoverClose
- PopoverContent
- PopoverTrigger
- Popper
- PopperAnchor
- PopperArrow
- PopperContent
- PopperContextFast
- PopperContextSlow
- PopperProviderFast
- PopperProviderSlow
- Portal
- PortalHost
- PortalItem
- PresenceChild
- Progress
- ProgressIndicator
- RadioGroup
- RadioGroupIndicator
- RadioGroupItem
- Range
- ResetPresence
- ScrollView
- Select
- SelectGroup
- SelectIcon
- SelectIndicator
- SelectItem
- SelectItemIndicator
- SelectItemText
- SelectLabel
- SelectRoot
- SelectScrollDownButton
- SelectScrollUpButton
- SelectSeparator
- SelectTrigger
- SelectValue
- SelectViewport
- Separator
- Sheet
- SheetBackground
- SheetContainer
- SheetControlled
- SheetController
- SheetHandle
- SheetOverlay
- SheetRoot
- SheetScrollView
- SizableText
- Slider
- SliderActive
- SliderThumb
- SliderTrack
- Spacer
- Span
- Spinner
- Square
- Strong
- Surface
- Switch
- SwitchThumb
- Tabs
- TabsContent
- TabsList
- TabsTab
- Text
- TextArea
- Theme
- ThemeUpdate
- Thumb
- Toast
- ToastAction
- ToastClose
- ToastDescription
- ToastItem
- ToastTitle
- ToggleGroup
- Tooltip
- TooltipGroup
- TooltipSimple
- Track
- View
- VisuallyHidden
- XGroup
- XStack
- YGroup
- YStack
- ZStack

