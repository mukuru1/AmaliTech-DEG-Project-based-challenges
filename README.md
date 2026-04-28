# SupportFlow Builder

A modern, visual flow builder for creating support chat workflows. Design conversation flows by dragging and connecting nodes, then preview the complete chat experience in real-time.


## Project Overview

SupportFlow Builder is a visual tool designed to help teams create customer support chat flows without writing code. It provides an intuitive interface for:

- **Building flows** with drag-and-drop nodes
- **Editing node properties** with a side panel
- **Previewing conversations** in real-time
- **Managing complex workflows** with validation

### What Problem Does It Solve?

Support teams need to create guided conversation flows for chatbots. SupportFlow Builder eliminates the need for manual configuration files or coding by providing a visual, interactive interface.

---

## Technology Stack

### Frontend Framework
- **React** - UI component library with hooks for state management
- **Vite** - Modern build tool for fast development and optimized production builds

### Styling
- **Tailwind CSS 3** - Utility-first CSS framework for rapid UI development
- **PostCSS** - CSS transformation pipeline for Tailwind processing
- **Autoprefixer** - Automatic vendor prefixing for cross-browser compatibility
- **Custom CSS Variables** - Defined in `styles/variables.css` for theme consistency

### Utilities
- **nanoid** - Lightweight ID generation for unique node and connection IDs
- **clsx** - Conditional className helper for clean component styling

### Development Tools
- **ESLint** - Code quality and style checking
- **Node.js** - Runtime environment

---

## Feature Walkthrough

### 1. **Flow Canvas**
- **Drag to create**: Drag nodes from the left sidebar onto the canvas
- **Pan**: Alt+Click or middle-mouse drag to pan the canvas
- **Snap to grid**: All nodes snap to a 24px grid for alignment
- **Visual feedback**: Selected nodes show a blue ring and shadow

### 2. **Node Types**
- **Start** - Entry point; can have welcome text and initial options
- **Message** - Send a text message to the user
- **Question** - Ask a question with 2+ answer options
- **End** - Terminal node with closing message

### 3. **Connections**
- **Drag from ports**: Drag connection lines from node ports (circles at node edges)
- **Question options**: Each option in a question node has its own output port
- **Start options**: Start nodes with options create multiple exit points
- **Visual indicators**: Dashed blue lines show active connections being drawn

### 4. **Node Editing**
- **Double-click** any node to edit its properties
- **Edit panel** shows node-specific fields:
  - Label (all nodes)
  - Text (message, question, start, end)
  - Options (question and start nodes)
- **Real-time preview** updates as you type

### 5. **Chat Preview**
- **Toggle** with the "Preview" button in the toolbar
- **Simulate** the complete conversation flow
- **Click options** to navigate through the conversation
- **Restart** the conversation with the restart button

### 6. **Validation**
- Real-time error checking in the edit panel
- Warnings about:
  - Missing start/end nodes
  - Disconnected nodes
  - Empty required fields
  - Missing option labels

### 7. **Auto Layout**
- Click "Auto Layout" to automatically arrange all nodes
- Uses hierarchical layout algorithm
- Positions nodes by flow depth and level

---

## Development Approach

### Step 1: Foundation (Styles & Utilities)

**Files Created:**
- `src/styles/variables.css` - CSS custom properties for colors, spacing, typography
- `src/styles/themes.css` - Theme-specific colors for different node types
- `src/styles/globals.css` - Global styles and animations
- `src/utils/coordinates.js` - Utility functions for position calculations
- `src/utils/graph.js` - Graph traversal and connection logic
- `src/utils/layout.js` - Auto-layout algorithm
- `src/utils/validation.js` - Flow validation rules

**Why this order?** - Building from the ground up ensures consistent design tokens and utilities that all components can use.

### Step 2: UI Components

**Files Created:**
- `src/components/UI/button.jsx` - Reusable button with variants
- `src/components/UI/card.jsx` - Card container with header/body
- `src/components/UI/input.jsx` - Text input with labels and errors
- `src/components/UI/modal.jsx` - Modal dialog with backdrop
- `src/components/UI/textArea.jsx` - Multi-line text input

**Why?** - Isolated, reusable UI components make larger components easier to build and maintain.

### Step 3: State Management

**Files Created:**
- `src/context/flowcontext.jsx` - Global state and reducer logic
- `src/hooks/useFlow.js` - Custom hook for flow operations
- `src/hooks/useConnections.js` - Custom hook for connection management
- `src/hooks/useNodeSelection.js` - Custom hook for selection state
- `src/hooks/useTraversal.js` - Custom hook for flow navigation

**Why?** - Centralizing state management before building consuming components prevents tight coupling and makes state predictable.

### Step 4: Canvas & Nodes

**Files Created:**
- `src/components/flowcanvas/nodeTypes.jsx` - Node type definitions and configs
- `src/components/flowcanvas/node.jsx` - Individual node component with ports
- `src/components/flowcanvas/connections.jsx` - SVG connection line renderer
- `src/components/flowcanvas/flowCanvas.jsx` - Main canvas with pan/drag logic
- `src/components/flowcanvas/canvasWrapper.jsx` - Canvas + node palette layout

**Why?** - Building the canvas layer enables visual interaction with the data model.

### Step 5: Editor Components

**Files Created:**
- `src/components/Editor/nodeEditor.jsx` - Node property editor
- `src/components/Editor/optionEditor.jsx` - Option CRUD for questions
- `src/components/Editor/editPanel.jsx` - Complete edit panel with validation

**Why?** - Separating editor logic allows for modular, testable components.

### Step 6: Preview Components

**Files Created:**
- `src/components/Preview/chatMessage.jsx` - Single chat message display
- `src/components/Preview/optionButtons.jsx` - Option button group
- `src/components/Preview/chatWindow.jsx` - Chat simulation logic
- `src/components/Preview/previewControls.jsx` - Preview controls

**Why?** - Preview is a separate subsystem that traverses the flow independently.

### Step 7: Page & App Integration

**Files Updated/Created:**
- `src/pages/BuilderPage.jsx` - Main builder page layout
- `src/App.jsx` - App root with context provider
- `src/index.css` - Tailwind and global style imports
- `tailwind.config.js` - Tailwind theme configuration

**Why?** - Top-level components tie everything together.

### Step 8: Flow Data Integration

**Files Updated:**
- `src/flow_data.json` - Pre-loaded example flow with 6 nodes
- `src/context/flowcontext.jsx` - Updated to load and convert JSON format

**Conversion Logic:**
- JSON uses flat structure with `nextId` pointers in options
- Context converts to internal format: separate `nodes` and `connections` arrays
- This allows the app to work with both JSON data and user edits

---

### SVG Connection Lines
- **Bezier curves** for smooth paths between nodes
- **Dashed animation** during active connection drawing
- **Arrowheads** indicating flow direction
- **Hover detection** on invisible wider path for easy clicking

---

## Design Decisions

### Why Context + Reducer?
- Simpler than Redux for this project size
- Avoids prop drilling through many component layers
- Easy to debug and reason about state changes

### Why Separate Hooks?
- Each hook has a specific responsibility
- Easier to test and reuse logic
- Components stay focused and readable

### Why SVG for Connections?
- Smooth, scalable rendering
- Can overlay on canvas without layout issues
- Easy to animate and customize paths

### Why Tailwind CSS?
- Rapid development with utility classes
- Consistent spacing and sizing system
- Easy to customize with CSS variables
- Small production bundle

### Why Snap-to-Grid?
- Professional alignment and appearance
- Easier to visually organize flows
- Prevents accidental micro-movements

### Why Flow Data JSON?
- Pre-populated example helps users understand the tool
- Shows real-world use case (support flow)
- Demonstrates system's capability with 6 interconnected nodes

---



### Nodes not appearing on canvas?
- Ensure nodes were dragged from the left sidebar
- Check browser console for errors
- Refresh the page

### Preview not showing options?
- Verify the node has options added (use OptionEditor)
- Check validation panel for missing labels
- Ensure connections are properly drawn

### Canvas pans unexpectedly?
- Make sure Alt key is released before clicking
- On Mac, Command key triggers different behavior - use Option instead

---


## Summary

SupportFlow Builder demonstrates modern React patterns including:
- Context API for state management
- Custom hooks for reusable logic
- Component composition and separation of concerns
- SVG for complex interactive graphics
- Tailwind CSS for styling
- Vite for fast development

The project is production-ready and can serve as a foundation for more advanced flow builder features.
