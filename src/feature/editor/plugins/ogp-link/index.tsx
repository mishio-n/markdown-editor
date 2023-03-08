import { $isLinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { load } from "cheerio";
import { $getSelection, $isRangeSelection } from "lexical";
import { FC, useEffect, useState } from "react";

type OGP = {
  title: string;
  description: string;
  meta: string;
  faviconUrl: string;
  ogImageUrl?: string;
};

export const OgpLinkPlugin: FC = () => {
  const [ogp, setOgp] = useState<OGP>();
  const [editor] = useLexicalComposerContext();

  const getOgpData = async (url: string) => {
    const res = await fetch(url, {
      headers: { "User-Agent": "bot", "Content-Type": "text/html" },
    });
    const html = await res.text();
    const $ = load(html);
    const meta = $("meta");
  };

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          return;
        }

        const anchorNode = selection.anchor.getNode();
        const targetNode =
          anchorNode.getKey() === "root"
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();

        if ($isLinkNode(targetNode)) {
          targetNode.getTextContent();
          setOgp({});
        } else {
          console.log(targetNode.getType());
        }
      });
    });
  }, [editor]);
};
