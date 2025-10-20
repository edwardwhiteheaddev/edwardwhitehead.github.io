---
title: 'Advanced React Patterns: Render Props and Higher-Order Components'
slug: 'advanced-react-patterns-render-props-hoc'
date: '2024-12-18'
description: 'Deep dive into advanced React patterns including render props, higher-order components, and compound components for building reusable UI libraries.'
category: 'React'
tags: ['React', 'Render Props', 'Higher-Order Components', 'Compound Components', 'Advanced Patterns']
image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80'
featured: false
author: 'Edward Whitehead'

# SEO and AEO metadata fields
metaTitle: 'Advanced React Patterns: Render Props and Higher-Order Components | Edward Whitehead'
metaDescription: 'Master advanced React patterns including render props, HOCs, and compound components. Learn to build flexible, reusable React components and UI libraries.'
keywords:
  - 'React Patterns'
  - 'Render Props'
  - 'Higher-Order Components'
  - 'HOC'
  - 'Compound Components'
  - 'React Advanced'
  - 'Component Composition'
  - 'Reusable Components'
ogTitle: 'Advanced React Patterns: Render Props and Higher-Order Components'
ogDescription: 'Deep dive into advanced React patterns including render props, higher-order components, and compound components for building reusable UI libraries.'
ogImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80'
twitterTitle: 'Advanced React Patterns Guide'
twitterDescription: 'Master render props, HOCs, and compound components for building flexible React UIs.'
twitterImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80'
twitterCard: 'summary_large_image'
canonicalUrl: 'https://edwardwhitehead.dev/blog/advanced-react-patterns-render-props-hoc'

structuredData:
  "@context": "https://schema.org"
  "@type": "BlogPosting"
  "headline": "Advanced React Patterns: Render Props and Higher-Order Components"
  "description": "Deep dive into advanced React patterns including render props, higher-order components, and compound components for building reusable UI libraries."
  "author":
    "@type": "Person"
    "name": "Edward Whitehead"
    "url": "https://edwardwhitehead.dev"
  "datePublished": "2024-12-18"
  "dateModified": "2024-12-18"
  "mainEntityOfPage":
    "@type": "WebPage"
    "@id": "https://edwardwhitehead.dev/blog/advanced-react-patterns-render-props-hoc"
  "publisher":
    "@type": "Person"
    "name": "Edward Whitehead"
  "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80"
  "articleSection": "React"
  "keywords": ["React Patterns", "Render Props", "Higher-Order Components", "HOC", "Compound Components"]
---

# Advanced React Patterns: Render Props and Higher-Order Components

As React applications grow in complexity, understanding advanced patterns becomes crucial for building maintainable, reusable components. Render props and higher-order components are powerful techniques that enable flexible component composition.

## Render Props Pattern

The render props pattern allows components to share code by passing a function as a prop that returns JSX.

### Basic Implementation

```jsx
function MouseTracker({ render }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return render(mousePosition);
}

// Usage
<MouseTracker render={(mousePosition) => (
  <div>
    Mouse is at: {mousePosition.x}, {mousePosition.y}
  </div>
)} />
```

### Render Props with Hooks

Modern React with hooks provides an even cleaner approach:

```jsx
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}

// Usage
function MouseDisplay() {
  const mousePosition = useMousePosition();

  return (
    <div>
      Mouse position: {mousePosition.x}, {mousePosition.y}
    </div>
  );
}
```

## Higher-Order Components (HOCs)

HOCs are functions that take a component and return a new component with additional props or behavior.

### Basic HOC Pattern

```jsx
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}

// Usage
const UserProfileWithLoading = withLoading(UserProfile);

// In your component
<UserProfileWithLoading
  isLoading={loading}
  user={user}
  onUpdate={handleUpdate}
/>
```

### HOC with Hooks

```jsx
function withUserData(WrappedComponent) {
  return function WithUserDataComponent(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchUser().then(user => {
        setUser(user);
        setLoading(false);
      });
    }, []);

    return (
      <WrappedComponent
        {...props}
        user={user}
        loading={loading}
      />
    );
  };
}
```

## Compound Components

Compound components allow related components to work together while maintaining a clean API.

### Basic Compound Component

```jsx
function Menu({ children }) {
  return <div className="menu">{children}</div>;
}

function MenuItem({ children, onClick }) {
  return (
    <div className="menu-item" onClick={onClick}>
      {children}
    </div>
  );
}

// Usage
<Menu>
  <MenuItem onClick={() => console.log('Home')}>Home</MenuItem>
  <MenuItem onClick={() => console.log('About')}>About</MenuItem>
  <MenuItem onClick={() => console.log('Contact')}>Contact</MenuItem>
</Menu>
```

### Advanced Compound Component with Context

```jsx
const MenuContext = createContext();

function Menu({ children }) {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <MenuContext.Provider value={{ activeItem, setActiveItem }}>
      <div className="menu">{children}</div>
    </MenuContext.Provider>
  );
}

function MenuItem({ children, itemId, onClick }) {
  const { activeItem, setActiveItem } = useContext(MenuContext);
  const isActive = activeItem === itemId;

  return (
    <div
      className={`menu-item ${isActive ? 'active' : ''}`}
      onClick={() => {
        setActiveItem(itemId);
        onClick?.();
      }}
    >
      {children}
    </div>
  );
}
```

## Best Practices

### When to Use Each Pattern

1. **Render Props**: When you need to share logic that involves rendering decisions
2. **HOCs**: When you need to add the same props or behavior to multiple components
3. **Compound Components**: When building related components that should work together

### Common Pitfalls

1. **HOC naming collisions**: Always use displayName for debugging
2. **Render props callback hell**: Keep render props simple and focused
3. **Compound component complexity**: Don't over-engineer simple component relationships

## Modern Alternatives

With React 18 and the rise of hooks, some patterns have evolved:

### Custom Hooks as an Alternative

```jsx
function useMenuState() {
  const [activeItem, setActiveItem] = useState(null);
  return { activeItem, setActiveItem };
}

function Menu({ children, onItemClick }) {
  const { activeItem, setActiveItem } = useMenuState();

  return (
    <div className="menu">
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          activeItem,
          setActiveItem,
          onClick: () => {
            setActiveItem(child.props.itemId);
            onItemClick?.(child.props.itemId);
          }
        })
      )}
    </div>
  );
}
```

## Conclusion

Advanced React patterns like render props, HOCs, and compound components enable powerful component composition and code reuse. While hooks have simplified many use cases, these patterns remain valuable tools for complex component architectures.

The key is choosing the right pattern for your specific use case and maintaining clean, predictable APIs that other developers can easily understand and use.
