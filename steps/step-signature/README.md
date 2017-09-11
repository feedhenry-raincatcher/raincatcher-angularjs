# Signature generic step

FeedHenry RainCatcher generic step implementing signatures.

## Setup
This module is packaged in a CommonJS format, exporting the name of the Angular namespace.
The module can be included in an angular.js as follows:

Require the browserify dependency as an angular module
```javascript
angular.module('app', [require('fh-wfm-signature').ngModule])
```
## Client-side usage

### Collecting signatures
The Base64 encoded signature will be assigned to the value attribute of the `signature-form` directive.

Default mime-type is `image/png`, however, this can be overriden by passing mime-type value via encoding attribute.

The image quality can also be adjusted by setting the `image-quality` attribute. See table below for details.

|    Name    | Low | medium | High |
| ---------- | --- | ------ | ---- |
| image/jpeg | 0.1 |   0.5  |   1  |
| image/png  | 0.1 |   0.5  |   1  |
| image/webp | 0.1 |   0.5  |   1  |

```html
<signature-form value="ctrl.model" encoding="image/jpeg" image-quality="0.5"></signature-form>
```

### Displaying signatures
The `src` attribute of the image tag is bound to the `value` attribute of the signature tag.  To display a base64 encoded string, prefix it with the string: `data:image/png;base64,`
```html
<signature value="ctrl.model"></signature>
```

### Signature CSS styles
Include the module SASS file in your application sass:
```sass
@import 'node_modules/@raincatcher/step-signature/lib/signature.scss
```

#### Directives

| Name | Attributes |
| ---- | ----------- |
| signature-form | value, options, encoding, image-quality |
| signature | value |
