# ANTIGRAVITY AI PROMPT: Add Style B (Green Circular) Template to Sticker Generator

## PROJECT OVERVIEW

Enhance the existing sticker generator in the Hon. Ghali Panda website by adding a new **Style B (Green Circular)** template option. This will give users two distinct design choices while maintaining all existing advanced features (photo cropping, batch mode, QR codes, multilingual support, etc.).

---

## GOAL

Add a new template option called **"Green Circular"** to the existing sticker generator that allows users to:
1. Choose between existing templates (Classic Red, Modern Blue, Vibrant Pink, Elegant, Bold Green, Neon Green, Royal Purple) AND the new **Green Circular** template
2. Customize supporter name, campaign slogan, and year
3. Upload and crop their photo for the circular frame
4. Download high-quality PNG stickers with all existing features

---

## CURRENT STATE

**File Location:** `/app/(personal)/sticker-generator/page.tsx`

**Existing Templates:**
- Classic Red (burgundy/maroon gradient)
- Modern Blue (blue/indigo gradient with yellow accent)
- Vibrant Pink (pink/rose gradient)
- Elegant (gray/slate with gold accent)
- Bold Green (green/emerald gradient)
- Neon Green (teal/emerald with lime accent)
- Royal Purple (purple/violet with gold accent)

**Existing Features:**
- Photo cropping with `react-easy-crop`
- Multiple output sizes (Small, Medium, Large, Story, Banner, Poster)
- Multilingual support (English, Hausa, Arabic)
- QR code generation
- Batch mode (generate multiple stickers)
- Watermark option
- Campaign hashtag customization
- Statistics tracking (total generated, last generated)
- HTML2Canvas PNG export

---

## NEW TEMPLATE SPECIFICATION: "Green Circular"

### Template Configuration

Add this new template object to the existing `templates` object in the sticker generator:

```typescript
greenCircular: {
  bg: 'bg-gradient-to-br from-green-800 via-green-900 to-black',
  accent: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
  text: 'text-white',
  name: 'Green Circular',
  icon: '🟢',
  layout: 'circular', // NEW: indicates special circular layout
  hasCircularFrame: true, // NEW: enables circular photo frame
  hasGhaliPhoto: true, // NEW: includes Hon. Ghali's photo
}
```

### Visual Design

**Layout Structure:**
```
┌─────────────────────────────┐
│  Forest Green Background    │
│  (#1B5E20 or similar)       │
│                             │
│  ┌─────────────────────┐    │
│  │  NNPP Logo/Icon     │    │
│  │  (White shield)     │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │  Circular Photo     │    │
│  │  (Gold border)      │    │
│  │  User's photo       │    │
│  │  (400px diameter)   │    │
│  └─────────────────────┘    │
│                             │
│  Supporter Name             │
│  (White, italic)            │
│                             │
│  ★ ★                        │
│  Campaign Slogan            │
│  (Gold, bold)               │
│  ★ ★                        │
│                             │
│  Year (2027)                │
│  (White, large)             │
│                             │
│  NNPP – GAYA/AJINGI/ALBASU │
│  (White, small)             │
│                             │
└─────────────────────────────┘
```

### Component Elements

**Fixed Elements (Cannot be changed by template):**
- Background: Forest Green gradient (#1B5E20 to darker)
- NNPP Logo/Icon: White shield icon (top center)
- Circular photo frame: Gold border (400px diameter)
- Campaign text: "NNPP – GAYA/AJINGI/ALBASU" (bottom)
- Decorative stars: Gold stars (★) above and below slogan

**Editable Elements (User can customize):**
- Supporter Name (text input, max 30 characters)
- Campaign Slogan (text input, max 50 characters, default: "TOGETHER WE RISE")
- Year (number input, 4 digits, default: 2027)
- Photo (upload and crop)

### Color Palette

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary Background | Forest Green | #1B5E20 |
| Secondary Background | Dark Green | #0D3817 |
| Accent | Gold/Yellow | #FFD700 |
| Text Primary | White | #FFFFFF |
| Text Secondary | Gold | #FFD700 |
| Border | Gold | #FFD700 |

### Typography

- **Supporter Name:** White, italic, 24px, centered
- **Campaign Slogan:** Gold, bold, 28px, centered
- **Year:** White, bold, 32px, centered
- **Campaign Text:** White, regular, 12px, centered
- **Decorative Stars:** Gold, 20px

---

## IMPLEMENTATION REQUIREMENTS

### 1. Update Template Configuration

In the `templates` object, add the new Green Circular template:

```typescript
greenCircular: {
  bg: 'bg-gradient-to-br from-green-800 via-green-900 to-black',
  accent: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
  text: 'text-white',
  name: 'Green Circular',
  icon: '🟢',
  layout: 'circular',
  hasCircularFrame: true,
  hasGhaliPhoto: true,
  colors: {
    primary: '#1B5E20',
    secondary: '#0D3817',
    accent: '#FFD700',
    text: '#FFFFFF',
  }
}
```

### 2. Add Editable Fields for Green Circular Template

When `template === 'greenCircular'`, show these additional editable fields:

**Fields to Add:**
- **Campaign Slogan Input** (text field, max 50 characters, default: "TOGETHER WE RISE")
- **Year Input** (number field, 4 digits, default: 2027)
- **Slogan Preset Buttons** (optional quick selections):
  - "TOGETHER WE RISE"
  - "KWANKWASIYYA IN ACTION"
  - "COMMUNITY FIRST"
  - "PROGRESS FOR ALL"

### 3. Update Sticker Rendering Logic

Modify the sticker rendering section to handle the new circular layout:

**Conditional Rendering:**
```typescript
{template === 'greenCircular' ? (
  // NEW: Green Circular Layout
  <div className={`${templates[template].bg} rounded-2xl shadow-xl flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
    {/* NNPP Logo */}
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 z-10">
      <svg className="w-8 h-8 text-green-800" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
      </svg>
    </div>

    {/* Circular Photo Frame */}
    <div className="relative w-24 h-24 mb-4 z-10">
      <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
        {supporterPhoto ? (
          <img src={supporterPhoto} alt="Supporter" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-400 flex items-center justify-center">
            <span className="text-white text-xs">Photo</span>
          </div>
        )}
      </div>
    </div>

    {/* Supporter Name */}
    <p className="text-white italic text-lg font-medium text-center mb-2 z-10">
      {supporterName || 'Your Name'}
    </p>

    {/* Decorative Stars */}
    <div className="flex gap-2 mb-2 z-10">
      <span className="text-yellow-400 text-lg">★</span>
      <span className="text-yellow-400 text-lg">★</span>
    </div>

    {/* Campaign Slogan */}
    <p className="text-yellow-400 font-bold text-center text-lg mb-1 z-10">
      {customMessage || 'TOGETHER WE RISE'}
    </p>

    {/* Year */}
    <p className="text-white font-bold text-2xl text-center mb-2 z-10">
      {year || '2027'}
    </p>

    {/* Decorative Stars */}
    <div className="flex gap-2 mb-3 z-10">
      <span className="text-yellow-400 text-lg">★</span>
      <span className="text-yellow-400 text-lg">★</span>
    </div>

    {/* Campaign Text */}
    <p className="text-white text-xs font-semibold text-center z-10">
      NNPP – GAYA/AJINGI/ALBASU
    </p>
  </div>
) : (
  // EXISTING: Original template rendering
  // ... keep existing code ...
)}
```

### 4. Add State Variables

Add these new state variables to track Green Circular specific data:

```typescript
const [customMessage, setCustomMessage] = useState('TOGETHER WE RISE')
const [year, setYear] = useState('2027')
```

### 5. Update Customization Panel

When `template === 'greenCircular'`, display these additional controls:

```typescript
{template === 'greenCircular' && (
  <>
    {/* Campaign Slogan */}
    <div>
      <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700 mb-1">
        Campaign Slogan
      </label>
      <input
        type="text"
        id="customMessage"
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value.toUpperCase())}
        maxLength={50}
        placeholder="TOGETHER WE RISE"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <p className="mt-1 text-xs text-gray-500">
        {customMessage.length}/50 characters
      </p>
      
      {/* Preset Buttons */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          onClick={() => setCustomMessage('TOGETHER WE RISE')}
          className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
        >
          Together We Rise
        </button>
        <button
          onClick={() => setCustomMessage('KWANKWASIYYA IN ACTION')}
          className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
        >
          Kwankwasiyya
        </button>
        <button
          onClick={() => setCustomMessage('COMMUNITY FIRST')}
          className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
        >
          Community First
        </button>
        <button
          onClick={() => setCustomMessage('PROGRESS FOR ALL')}
          className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
        >
          Progress For All
        </button>
      </div>
    </div>

    {/* Year */}
    <div>
      <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
        Year
      </label>
      <input
        type="number"
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        min="2020"
        max="2030"
        placeholder="2027"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <p className="mt-1 text-xs text-gray-500">
        Election year or campaign year
      </p>
    </div>
  </>
)}
```

### 6. Update Template Selector

Ensure the template selector includes the new Green Circular option:

```typescript
// In the template selector UI, add:
<button
  onClick={() => setTemplate('greenCircular')}
  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
    template === 'greenCircular'
      ? 'bg-green-600 text-white shadow-lg'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  }`}
>
  <span className="text-xl">{templates.greenCircular.icon}</span>
  <span>{templates.greenCircular.name}</span>
</button>
```

---

## INTEGRATION CHECKLIST

- [ ] Add `greenCircular` template configuration to `templates` object
- [ ] Add `customMessage` and `year` state variables
- [ ] Update sticker rendering logic with conditional Green Circular layout
- [ ] Add customization panel fields for Green Circular template
- [ ] Update template selector to include Green Circular button
- [ ] Test photo upload and cropping with Green Circular template
- [ ] Test all output sizes (Small, Medium, Large, Story, Banner, Poster) with Green Circular
- [ ] Test batch mode with Green Circular template
- [ ] Test QR code generation with Green Circular template
- [ ] Test multilingual support with Green Circular template
- [ ] Verify PNG download quality and filename
- [ ] Test on mobile and desktop devices
- [ ] Verify no conflicts with existing templates
- [ ] Test watermark display with Green Circular template
- [ ] Test statistics tracking with Green Circular template

---

## TESTING SCENARIOS

### Basic Functionality
1. Select Green Circular template
2. Enter supporter name
3. Enter custom campaign slogan
4. Enter year
5. Upload and crop a photo
6. Download PNG
7. Verify PNG contains all elements correctly

### Advanced Features
1. Generate sticker in different sizes (Small, Medium, Large, Story, Banner, Poster)
2. Generate multiple stickers in batch mode
3. Add QR code to Green Circular sticker
4. Test multilingual text (English, Hausa, Arabic)
5. Enable/disable watermark
6. Customize campaign hashtag
7. Verify statistics update

### Edge Cases
1. Empty supporter name (should show "Your Name")
2. Very long supporter name (test max 30 characters)
3. Very long campaign slogan (test max 50 characters)
4. Invalid year input (should validate 2020-2030)
5. No photo uploaded (should show placeholder)
6. Large photo file (should handle gracefully)

---

## STYLING NOTES

**Green Circular Color Scheme:**
- Primary: Forest Green (#1B5E20) - professional, campaign-aligned
- Secondary: Dark Green (#0D3817) - depth and contrast
- Accent: Gold (#FFD700) - premium feel, matches campaign branding
- Text: White (#FFFFFF) - high contrast, readability

**Circular Frame:**
- Diameter: 400px (on 1080x1080 canvas)
- Border: 4px gold
- Shadow: Subtle drop shadow for depth
- Aspect Ratio: 1:1 (square crop)

**Typography:**
- Supporter Name: Italic (to distinguish from other text)
- Campaign Slogan: Bold, larger font (main message)
- Year: Extra large (emphasis)
- Stars: Decorative elements (visual balance)

---

## BACKWARDS COMPATIBILITY

**Ensure:**
- All existing templates (Classic Red, Modern Blue, etc.) continue to work unchanged
- Existing state variables are not affected
- Photo cropping feature works with all templates
- Batch mode works with Green Circular template
- QR code generation works with Green Circular template
- Multilingual support applies to Green Circular template
- Statistics tracking includes Green Circular template
- Download filename includes template name: `ghali-sticker-green-circular-[timestamp].png`

---

## DEPLOYMENT CHECKLIST

- [ ] Code changes tested locally
- [ ] No console errors or warnings
- [ ] All templates render correctly
- [ ] Green Circular template displays as expected
- [ ] Photo upload and cropping works
- [ ] PNG download generates correct file
- [ ] Mobile responsive design maintained
- [ ] Performance is acceptable (no lag)
- [ ] Accessibility maintained (keyboard navigation, alt text)
- [ ] Brand compliance verified (no unauthorized modifications)
- [ ] Ready for production deployment

---

## SUCCESS CRITERIA

✓ Green Circular template appears in template selector
✓ Users can select and view Green Circular template
✓ Supporter name input works and updates preview
✓ Campaign slogan input works and updates preview
✓ Year input works and updates preview
✓ Photo upload and cropping works with circular frame
✓ PNG download generates high-quality image
✓ All existing templates still work unchanged
✓ All advanced features (batch, QR, multilingual) work with Green Circular
✓ No conflicts or errors in console
✓ Mobile responsive design works
✓ Performance is smooth and responsive

---

## NOTES FOR AI IMPLEMENTATION

1. **Preserve Existing Code:** Do not modify existing template rendering unless necessary
2. **Use Conditional Rendering:** Use `template === 'greenCircular'` to show/hide Green Circular specific UI
3. **Maintain State Management:** Keep existing state variables and add only new ones for Green Circular
4. **CSS Classes:** Use existing Tailwind classes for consistency
5. **Photo Handling:** Reuse existing photo cropping logic with `react-easy-crop`
6. **PNG Export:** Use existing `html2canvas` logic, ensure filename includes template name
7. **Testing:** Test thoroughly with all existing features before deployment
8. **Documentation:** Update any existing documentation to mention the new Green Circular template

---

## FILE TO MODIFY

**Primary File:** `/app/(personal)/sticker-generator/page.tsx`

**Changes Required:**
1. Add `greenCircular` template to `templates` object
2. Add `customMessage` and `year` state variables
3. Add conditional rendering for Green Circular layout
4. Add customization panel fields for Green Circular
5. Update template selector UI
6. Test all functionality

**No New Files Required** - All changes are within the existing sticker generator component.

---

## TIMELINE

- **Analysis & Planning:** 30 minutes
- **Code Implementation:** 1-2 hours
- **Testing & QA:** 1-2 hours
- **Bug Fixes & Refinement:** 30 minutes - 1 hour
- **Final Deployment:** 30 minutes

**Total Estimated Time:** 4-6 hours

---

## FINAL NOTES

This enhancement adds a new design option while preserving all existing functionality. The Green Circular template is fully integrated with all advanced features including photo cropping, batch mode, QR codes, multilingual support, and statistics tracking.

Users now have the choice between:
1. **Classic Red** - Traditional campaign style
2. **Modern Blue** - Contemporary tech-forward style
3. **Vibrant Pink** - Eye-catching, energetic style
4. **Elegant** - Premium, sophisticated style
5. **Bold Green** - Strong, confident style
6. **Neon Green** - Modern, vibrant style
7. **Royal Purple** - Regal, authoritative style
8. **Green Circular** - NEW: Supporter-focused, community style

**Ready to implement!**
