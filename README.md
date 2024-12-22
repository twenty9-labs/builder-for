# Builder for
```typescript
// Example usage
type Post = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  };
  tags: string[];
  published: boolean;
}

// Create a base post
const basePost: Post = {
  id: 0,
  title: "",
  author: {
    name: "",
    email: "",
  },
  tags: [],
  published: false,
};

// Create a post builder
const postBuilder = builderFor(basePost);

// ✅ Good examples
const post1 = postBuilder({
  title: "Hello World",
  author: { name: "John" }, // Partial nested objects work
});

const post2 = postBuilder({
  title: "TypeScript Tips",
  author: {
    name: "Jane",
    email: "jane@example.com",
  },
  published: true,
});

// 🛑 Bad examples - These will cause type errors
const badPost1 = postBuilder({
  author: {
    name: 123, // Error: number is not assignable to string
  },
});

const badPost2 = postBuilder({
  unknownField: "test", // Error: unknownField does not exist in Post
});

```