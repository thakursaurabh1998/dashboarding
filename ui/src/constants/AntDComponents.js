const InputOptions = {
  name: 'Input',
  display: {
    prefix: [false, String],
    suffix: [false, String],
    maxLength: [false, Number],
    addonAfter: [false, String],
    addonBefore: [false, String],
    allowClear: [true, Boolean, [true, false]],
    size: [true, String, ['large', 'middle', 'small']],
  },
  rules: {
    enum: [false, Array],
    min: [false, Number],
    required: [true, Boolean, [true, false]],
    whitespace: [true, Boolean, [true, false]],
    type: [true, String, ['string', 'number', 'boolean', 'url', 'email']],
  },
};

const TextAreaOptions = {
  name: 'TextArea',
};

const getSection = (section) => (...children) => ({
  title: section,
  value: section,
  disabled: true,
  children: children.map((child) => ({
    title: child.name,
    value: child.name,
  })),
});

export const AntDComponents = [
  getSection('Text')(InputOptions, TextAreaOptions),
  getSection('Checkbox')(),
];

export const componentsMeta = {
  Input: InputOptions,
  TextArea: TextAreaOptions,
};
