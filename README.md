#jsx-gettext-extract-loader

Your code in JSX looks like this:

```html
<div>
  <a onClick={this.handleLearnMoreClick} 
     href='http://www.dailymotion.com/repost' 
     style={{textDecoration: 'none'}}
    >
    {__('Learn more')}
  </a>
</div>
```

But it gets mangled by Webpack:

```javascript
_react2['default'].createElement(
  'div',
  null,
  _react2['default'].createElement(
    'a',
    { onClick: _this.handleLearnMoreClick,
      href: 'http://www.dailymotion.com/repost',
      style: { textDecoration: 'none' }
    },
    (0, _i18n.__)('Learn more')
  )
)
```

Problem: gettext does not know what needs to be translated. It is look for `__('learn more')` and cannot read `(0, _i18n.__)('Learn more')`

Solution: extract out gettext translations to another file for gettext!

```javascript
modules: {
  ...
  loaders: [
    ...
      {
        test: /\.jsx$/,
        loaders: ['react-hot', 'babel', 'jsx-gettext-extract-loader?output=.tmp']
      }
    ...
  ]
  ...
}

```

This creates a gettext readable file with all the gettext translations:

```javascript
// .tmp/jsx-translations.js

__('learn more')
__('a new way to share')

```