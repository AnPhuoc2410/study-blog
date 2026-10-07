---
title: "Markdown & Code Syntax Guide"
published: 2026-10-06
description: "A showcase of supported Markdown features, code highlighting, tables, and callouts on Study Blog."
image: ""
tags:
  - Markdown
  - Guide
  - Syntax
category: "Technology"
draft: false
pinned: false
author: "An Phước"
---

This post demonstrates the rich Markdown capabilities and styling elements available on **Study Blog**.

## Typography & Formatting

You can write text with **bold**, *italic*, ~~strikethrough~~, or `inline code` formatting.

> "The only way to do great work is to love what you do."  
> &mdash; Steve Jobs

### Lists

Ordered lists:
1. First item
2. Second item
3. Third item

Unordered lists:
- Web Development (Astro, Svelte, TypeScript)
- Systems & Architecture
- Algorithm Design

### Task Lists

- [x] Set up Astro project
- [x] Configure English i18n
- [x] Personalize profile and settings
- [ ] Write first technical deep-dive

---

## Code Highlighting with Expressive Code

Code blocks come with language badges, copy buttons, line highlighting, and syntax themes.

### TypeScript Example

```typescript
interface BlogPost {
  title: string;
  published: Date;
  tags: string[];
  author: string;
}

function summarizePost(post: BlogPost): string {
  const dateStr = post.published.toISOString().split("T")[0];
  return `"${post.title}" by ${post.author} on ${dateStr} [${post.tags.join(", ")}]`;
}

const post: BlogPost = {
  title: "Welcome to Study Blog",
  published: new Date(),
  tags: ["Study", "Astro"],
  author: "An Phước",
};

console.log(summarizePost(post));
```

### Python Example

```python
def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence up to n numbers."""
    if n <= 0:
        return []
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]

if __name__ == "__main__":
    print(fibonacci(10))
```

---

## Tables

| Feature | Support | Description |
| :--- | :---: | :--- |
| **Static Generation** | ✅ | Fast pre-rendered HTML via Astro |
| **Code Highlighting** | ✅ | Expressive Code with copy & badges |
| **Math Equations** | ✅ | KaTeX inline and block syntax |
| **Diagrams** | ✅ | Mermaid and PlantUML rendering |

---

## Callouts & Admonitions

> [!NOTE]
> This is a standard note callout highlighting useful information.

> [!TIP]
> Pro-tip: Dark mode and theme color can be toggled from the settings panel on the navigation bar.

> [!WARNING]
> Keep external links updated to ensure smooth reading experiences.
