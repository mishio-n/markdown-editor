import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { FC } from "react";

export const MarkdownPlugin: FC = () => (
  <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
);
