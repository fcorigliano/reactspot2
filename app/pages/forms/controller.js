const React = require("react");
const View = require("./view");

exports.render = function render(req, res) {
  const FormsView = (props) => <View {...props} />;

  res.render(FormsView, {});
};
