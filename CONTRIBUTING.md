# Contributing to Lofty Labz

Thank you for your interest in contributing to the Lofty Labz constellation-themed website! This document provides guidelines and instructions for contributing.

## 🌟 Code of Conduct

By participating in this project, you agree to maintain a respectful and collaborative environment.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- pnpm (recommended package manager)
- Git
- Code editor (VS Code recommended)

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/lofty-labz.git
   cd lofty-labz
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use strict TypeScript typing
- **Components**: Functional components with hooks
- **Styling**: Tailwind CSS classes only (no inline styles)
- **Naming**: 
  - Components: PascalCase (e.g., `StarMap.tsx`)
  - Files: camelCase for utilities, PascalCase for components
  - Variables: camelCase
  - Constants: UPPER_SNAKE_CASE

### File Organization

```
src/app/
├── components/     # Reusable UI components
├── pages/          # Page-level components
├── data/           # Static data and content
├── lib/            # Utility functions
└── hooks/          # Custom React hooks
```

### Component Guidelines

1. **Keep components focused**: Each component should have a single responsibility
2. **Use TypeScript interfaces**: Define props interfaces for all components
3. **Accessibility**: Ensure all interactive elements are keyboard accessible
4. **Responsive**: Test on mobile, tablet, and desktop viewports

Example component structure:
```tsx
import { FC } from 'react';

interface MyComponentProps {
  title: string;
  description?: string;
}

export const MyComponent: FC<MyComponentProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && <p className="text-gray-300">{description}</p>}
    </div>
  );
};
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the purple color theme
- Maintain consistent spacing using Tailwind's spacing scale
- Use custom theme tokens defined in `src/styles/theme.css`
- Ensure sufficient color contrast for accessibility

### Animation Guidelines

- Use Motion (Framer Motion) for animations
- Keep animations subtle and purposeful
- Ensure animations don't cause motion sickness (provide reduced motion alternatives)
- Test animation performance on lower-end devices

## 🧪 Testing

Before submitting a pull request:

1. **Visual Testing**: Test on multiple screen sizes
2. **Functionality**: Verify all interactive elements work
3. **Accessibility**: Check keyboard navigation and screen reader compatibility
4. **Performance**: Ensure no performance regressions
5. **Browser Testing**: Test on Chrome, Firefox, and Safari

## 📦 Commit Guidelines

### Commit Message Format

Use conventional commit format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(star-map): add constellation hover effects
fix(navigation): resolve mobile menu z-index issue
docs(readme): update installation instructions
```

## 🔀 Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the guidelines above
3. **Test thoroughly** on multiple devices and browsers
4. **Update documentation** if needed
5. **Commit your changes** with clear commit messages
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request** with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Screenshots/videos for visual changes
   - Reference any related issues

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested keyboard navigation
- [ ] Tested on multiple browsers

## Screenshots
(if applicable)

## Related Issues
Closes #issue_number
```

## 🎨 Design Guidelines

### Brand Consistency
- Follow the purple color palette
- Use Orbitron font for headings
- Use Inter font for body text
- Maintain constellation metaphor throughout

### Interactive Elements
- Provide visual feedback on hover (desktop)
- Ensure touch targets are at least 44x44px (mobile)
- Use consistent animation timing
- Maintain constellation theme in UI elements

## 🐛 Reporting Bugs

When reporting bugs, include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: Visual evidence if applicable
6. **Environment**:
   - Browser and version
   - Device/OS
   - Screen size
   - Node version

## 💡 Feature Requests

We welcome feature requests! Please:

1. Check if the feature has already been requested
2. Provide clear use case and benefits
3. Include mockups or examples if possible
4. Explain how it fits the constellation theme

## 📖 Documentation

- Update README.md for user-facing changes
- Add inline comments for complex logic
- Update component documentation
- Include JSDoc comments for exported functions

## ❓ Questions

If you have questions:
- Check existing documentation
- Search closed issues
- Open a new issue with the `question` label

## 🙏 Thank You

Your contributions help make Lofty Labz better for everyone!

---

**Happy coding! 🌟**
