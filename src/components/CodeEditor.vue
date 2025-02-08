<template>
  <div id="CodeEditor">
    <div id="code-editor" ref="codeEditorRef" style="min-height: 400px" />
  </div>
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "one-light",
    lineNumbers: "on",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });
  monaco.editor.defineTheme("one-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      // 默认文本样式
      { token: "", foreground: "abb2bf", background: "282c34" },

      // 注释
      { token: "comment", foreground: "5c6370", fontStyle: "italic" },

      // 关键字（如 if, else, for, while 等）
      { token: "keyword", foreground: "c678dd", fontStyle: "bold" },

      // 数字
      { token: "number", foreground: "d19a66" },

      // 字符串
      { token: "string", foreground: "98c379" },

      // 运算符（如 +, -, = 等）
      { token: "operator", foreground: "e06c75" },

      // 函数名称
      { token: "function", foreground: "61afef" },

      // 变量名
      { token: "variable", foreground: "e06c75" },

      // 类名
      { token: "type", foreground: "e5c07b" },

      // 标签（HTML/XML 中）
      { token: "tag", foreground: "e06c75" },

      // 属性名（HTML/XML 中）
      { token: "attribute.name", foreground: "d19a66" },

      // 属性值
      { token: "attribute.value", foreground: "98c379" },

      // 常量
      { token: "constant", foreground: "d19a66" },
    ],
    colors: {
      "editor.background": "#282c34", // 背景色
      "editor.foreground": "#abb2bf", // 默认文字颜色
      "editor.lineHighlightBackground": "#3e4451", // 当前行高亮背景色
      "editorCursor.foreground": "#528bff", // 光标颜色
      "editorWhitespace.foreground": "#3b4048", // 空白字符的颜色

      // 选中文本的颜色
      "editor.selectionBackground": "#3e4451",
      "editor.selectionHighlightBackground": "#3e4451",

      // 括号匹配的颜色
      "editorBracketMatch.border": "#e06c75",

      // 滚动条颜色
      "scrollbarSlider.activeBackground": "#528bff40",
      "scrollbarSlider.hoverBackground": "#528bff20",
    },
  });
  monaco.editor.setTheme("one-dark");
  monaco.editor.defineTheme("one-light", {
    base: "vs",
    inherit: true,
    rules: [
      // 默认文本样式
      { token: "", foreground: "586e75", background: "fdf6e3" }, // 更浅的背景和较深的文字颜色

      // 注释
      { token: "comment", foreground: "93a1a1", fontStyle: "italic" },

      // 关键字（如 if, else, for, while 等）
      { token: "keyword", foreground: "268bd2", fontStyle: "bold" },

      // 数字
      { token: "number", foreground: "cb4b16" },

      // 字符串
      { token: "string", foreground: "2aa198" },

      // 运算符（如 +, -, = 等）
      { token: "operator", foreground: "657b83" },

      // 函数名称
      { token: "function", foreground: "268bd2" },

      // 变量名
      { token: "variable", foreground: "b58900" },

      // 类名
      { token: "type", foreground: "d33682" },

      // 标签（HTML/XML 中）
      { token: "tag", foreground: "dc322f" },

      // 属性名（HTML/XML 中）
      { token: "attribute.name", foreground: "859900" },

      // 属性值
      { token: "attribute.value", foreground: "2aa198" },

      // 常量
      { token: "constant", foreground: "b58900" },
    ],
    colors: {
      "editor.background": "#fdf6e3", // 浅色背景
      "editor.foreground": "#586e75", // 文本颜色
      "editor.lineHighlightBackground": "#eee8d5", // 当前行高亮背景色
      "editorCursor.foreground": "#dc322f", // 光标颜色
      "editorWhitespace.foreground": "#eee8d5", // 空白字符的颜色

      // 选中文本的颜色
      "editor.selectionBackground": "#eee8d5",
      "editor.selectionHighlightBackground": "#eee8d5",

      // 括号匹配的颜色
      "editorBracketMatch.border": "#268bd2",

      // 滚动条颜色
      "scrollbarSlider.activeBackground": "#dc322f40",
      "scrollbarSlider.hoverBackground": "#dc322f20",
    },
  });
  monaco.editor.setTheme("one-light");
  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped>
#CodeEditor {
}
</style>
