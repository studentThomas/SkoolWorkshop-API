module.exports = {
  logger: require("tracer").colorConsole({
    level: "info",
    format: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
    dateformat: "HH:MM:ss.L",
    preprocess: function (data) {
      data.title = data.title.toUpperCase();
    },
  }),
};
