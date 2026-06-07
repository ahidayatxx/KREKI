# HTML Architecture Layout Creation Guide

## Overview
Create interactive, layered architecture visualizations with modern styling and hover effects. Perfect for system architecture, platform designs, or multi-tier application diagrams.

## Core Structure

### 1. HTML Foundation
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Your Architecture Title]</title>
    <style>
        /* Styles go here */
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>[Architecture Title]</h1>
            <p>[Architecture Subtitle/Description]</p>
        </div>
        
        <div class="architecture">
            <!-- Layers go here -->
        </div>
        
        <div class="metrics">
            <!-- Performance metrics/benefits -->
        </div>
    </div>
    <script>
        /* Interactive JavaScript */
    </script>
</body>
</html>
```

## 2. Essential CSS Components

### Container & Layout
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    background: white;
    border-radius: 15px-20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    overflow: hidden;
}
```

### Header Styling
```css
.header {
    background: linear-gradient(135deg, [color1], [color2]);
    color: white;
    padding: 20px-30px;
    text-align: center;
}

.header h1 {
    margin: 0 0 10px 0;
    font-size: 1.5rem-2.5rem;
    font-weight: 300-600;
}

.header p {
    margin: 0;
    opacity: 0.9;
    font-size: 0.9rem-1.1rem;
}
```

### Layer System
```css
.layer {
    margin-bottom: 25px-30px;
    border-radius: 12px-15px;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
    overflow: hidden;
}

.layer:hover {
    transform: translateY(-3px to -5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1-0.15);
}

/* Layer Color Variants */
.layer-1 { background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); }
.layer-2 { background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%); }
.layer-3 { background: linear-gradient(135deg, #A8E6CF 0%, #7FD1AE 100%); }
.layer-4 { background: linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%); }
.layer-5 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
```

### Layer Headers
```css
.layer-title {
    font-size: 1.1rem-1.2rem;
    font-weight: 600;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    padding: 20px-30px;
    color: white;
}

.layer-icon {
    width: 24px-40px;
    height: 24px-40px;
    margin-right: 10px-15px;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}
```

### Component Grid System
```css
.components {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px-280px, 1fr));
    gap: 15px-20px;
    margin-top: 15px-20px;
    padding: 0-30px 30px;
}

.component {
    background: rgba(255,255,255,0.1) OR #f8f9ff;
    padding: 12px-20px;
    border-radius: 8px-10px;
    border: 1px-2px solid rgba(255,255,255,0.2) OR #e1e8ff;
    transition: all 0.3s ease;
}

.component:hover {
    background: rgba(255,255,255,0.2) OR #f0f4ff;
    transform: scale(1.02);
    border-color: #667eea; /* for light backgrounds */
}

.component-title {
    font-weight: 600;
    margin-bottom: 5px-10px;
    font-size: 14px-1.1rem;
    color: inherit OR #2d3748;
}

.component-desc {
    font-size: 12px-0.9rem;
    opacity: 0.9;
    line-height: 1.4-1.5;
    color: inherit OR #4a5568;
}
```

## 3. Interactive Features

### Toggle Functionality
```javascript
function toggleLayer(element) {
    const components = element.querySelector('.components');
    const isExpanded = components.style.display === 'none';
    
    // Close all other layers
    document.querySelectorAll('.components').forEach(comp => {
        comp.style.display = 'none';
    });
    
    // Toggle current layer
    if (isExpanded) {
        components.style.display = 'grid';
        element.style.transform = 'translateY(-3px)';
        element.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    } else {
        components.style.display = 'none';
        element.style.transform = 'translateY(0)';
        element.style.boxShadow = 'none';
    }
}
```

### Initialization
```javascript
document.addEventListener('DOMContentLoaded', function() {
    const firstLayer = document.querySelector('.layer');
    toggleLayer(firstLayer);
});
```

## 4. Additional Sections

### Metrics/Benefits Section
```css
.metrics {
    background: #f8f9fa OR linear-gradient(135deg, #667eea, #764ba2);
    padding: 20px-40px;
    margin-top: 20px-30px;
    border-radius: 12px-15px;
    color: #2c3e50 OR white;
}

.metric-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px-250px, 1fr));
    gap: 15px-20px;
    margin-top: 15px-30px;
}

.metric-item {
    background: white OR rgba(255,255,255,0.1);
    padding: 12px-20px;
    border-radius: 8px-10px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}
```

### Flow Arrows (Optional)
```css
.flow-arrows {
    text-align: center;
    padding: 20px 0;
}

.arrow {
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 20px solid #cbd5e0;
    margin: 0 auto;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}
```

## 5. Responsive Design
```css
@media (max-width: 768px) {
    .components {
        grid-template-columns: 1fr;
    }
    
    .layer-icon {
        display: none; /* if needed */
    }
    
    .header h1 {
        font-size: 1.5rem;
    }
    
    .container {
        margin: 10px;
        border-radius: 10px;
    }
}
```

## 6. Color Schemes

### Professional Blue
- `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- `linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)`

### Warm Gradients  
- `linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)`
- `linear-gradient(135deg, #f093fb, #f5576c)`

### Cool Gradients
- `linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)`
- `linear-gradient(135deg, #4facfe, #00f2fe)`

### Fresh Gradients
- `linear-gradient(135deg, #43e97b, #38f9d7)`
- `linear-gradient(135deg, #A8E6CF 0%, #7FD1AE 100%)`

## 7. Best Practices

1. **Use semantic layer ordering** - Start from bottom (infrastructure) to top (presentation)
2. **Consistent spacing** - Use multiples of 5px/rem for spacing
3. **Readable contrast** - Ensure text is readable on gradient backgrounds
4. **Progressive enhancement** - Basic functionality without JavaScript
5. **Icon integration** - Use emojis or icon fonts for visual appeal
6. **Performance** - Minimize animations for better performance
7. **Accessibility** - Include proper ARIA labels and keyboard navigation

## 8. Customization Tips

- **Layer Count**: Typically 3-6 layers work best
- **Component Count**: 3-4 components per layer for readability
- **Color Harmony**: Use tools like Coolors.co for gradient combinations
- **Typography**: Stick to system fonts for performance
- **Animations**: Keep transitions under 300ms for snappy feel
- **Content**: Use action-oriented titles and concise descriptions