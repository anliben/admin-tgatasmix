module.exports = {
  content: ["./src/**/*.{html,js}"],
  purge:{
    enable: true,
    content: ["./src/**/*.{html,js, ts}"]
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
