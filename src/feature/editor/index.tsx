import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import {
  $getRoot,
  $getSelection,
  EditorState,
  Klass,
  LexicalEditor,
  LexicalNode,
} from "lexical";
import { FC } from "react";
import { CodeHighlightPlugin } from "./plugins/code-highlight";
import { MarkdownPlugin } from "./plugins/markdown";

import styles from "./editor.module.scss";
import { ToolbarPlugin } from "./plugins/toolbar";
import { theme } from "./theme";

function onChange(editorState: EditorState, editor: LexicalEditor) {
  editorState.read(() => {
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

function onError(error: Error, editor: LexicalEditor) {
  console.error(error);
}

export const Editor: FC = () => {
  const nodes: Klass<LexicalNode>[] = [
    HeadingNode,
    ListNode,
    ListItemNode,
    LinkNode,
    AutoLinkNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
  ];

  const initialConfig = {
    namespace: "editor",
    theme,
    nodes,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ToolbarPlugin />
      <div className={styles.editorContainer}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className={styles.contentEditable} />
          }
          placeholder={<div className={styles.placeholder}>Writing here!</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <MarkdownPlugin />
        <CodeHighlightPlugin />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
};
