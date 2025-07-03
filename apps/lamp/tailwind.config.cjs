module.exports = {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.ts',
    './resources/**/*.jsx',
    './resources/**/*.tsx',
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: 'currentColor', // v3互換性維持
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // ← これを使いたいなら
  ],
};
