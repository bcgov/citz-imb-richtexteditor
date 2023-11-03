# BCGov Rich Text Editor for React

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](Redirect-URL)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

[![NodeJS](https://img.shields.io/badge/Node.js_20-43853D?style=for-the-badge&logo=node.js&logoColor=white)](NodeJS)
[![Typescript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](Typescript)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)](React)

Originally created by IMB developers working on the [DPIA] product.

<details>
<summary><h2>TL/DR</h2></summary>

1. Install package by following the steps at [Installing the Package](#installing-the-package).
2. Set up the package by following the steps at [Basic Setup Guide](#basic-setup-guide).
3. Output is HTML content in string form, not markdown.

</details>

---

## Table of Contents

- [General Information](#general-information)
- [Installing the Package](#installing-the-package) - **Start Here!**
- [Basic Setup Guide](#basic-setup-guide) - Setting up after installing.

## General Information

- For running on a NodeJS:20 React 18 app.
- Works with Vanilla JavaScript or Typescript 5.
- Output is HTML content in string form, not markdown.

---

<br />

## Installing the Package

1. Add the following line to your `package.json`:

``` JSON5
{
  "dependencies": {
    "@bcgov/citz-imb-richtexteditor": "https://github.com/bcgov/citz-imb-richtexteditor/releases/download/v<VERSION>/bcgov-citz-imb-richtexteditor-<VERSION>.tgz",
    // The rest of your dependencies...
  },
}
```

2. Replace `<VERSION>` with the version you wish to use. Reference [releases] for version numbers.

<br />

3. Run `npm install` to add the package.

[Return to Top](#bcgov-rich-text-editor-for-react)

<br />

## Basic Setup Guide

1. Add import `import { RichTextEditor } from '@bcgov/citz-imb-richtexteditor';`.

*Example:*

```JavaScript
import React, { useState } from 'react';
import { RichTextEditor } from '@bcgov/citz-imb-richtexteditor';

const MyComponent = () => {
  const [content, setContent] = useState('');
  return (
    <>
      <RichTextEditor content={content} setContent={setContent} />
    </>
  );
};
```

[Return to Top](#bcgov-rich-text-editor-for-react)

<!-- Link References -->

[releases]: https://github.com/bcgov/citz-imb-richtexteditor/releases
[DPIA]: https://github.com/bcgov/cirmo-dpia
