# Implementation Summary: "in" Operator

## Completed: July 9, 2026

### What Was Done

Successfully implemented the "in" operator for form field conditions, allowing fields to check if their value matches any value in a comma-separated list.

### Files Changed

#### Type Definitions (2 files)

1. `lib/opsvForm/models/json.ts` - Added `"in"` to `ConditionOperatorType`
2. `lib/opsvForm/models/condition.ts` - Added `"in"` to `ConditionOperator` type

#### FormBuilder (1 file)

3. `components/admin/formBuilder/shared/operatorViewModel.ts` - UI canonical operator is `"in"` ("is in"); wire aliases `has_one_of` / `hasOneOf` / `isOneOf` are normalized on parse so existing definitions load into the dropdown

#### Field Implementations (7 files)

4. `lib/opsvForm/models/fields/textField.ts` - Added "in" case to evaluate()
5. `lib/opsvForm/models/fields/textareaField.ts` - Added "in" case to evaluate()
6. `lib/opsvForm/models/fields/integerField.ts` - Added "in" and "!=" cases to evaluate()
7. `lib/opsvForm/models/fields/decimalField.ts` - Added "in" and "!=" cases to evaluate()
8. `lib/opsvForm/models/fields/dateField.ts` - Refactored evaluate() with "in" and "!=" support
9. `lib/opsvForm/models/fields/singleChoicesField.ts` - Added "in" case to evaluate()
10. `lib/opsvForm/models/fields/subformField.ts` - Added "in" case to evaluate()

**Total: 10 files modified**

### How It Works

**FormBuilder (Admin Side)**:

- Admin selects "is in" operator from dropdown
- Admin enters comma-separated values: `cat,dog,elephant`
- Condition saved to form definition JSON

**Form Renderer (Runtime)**:

- When form loads, condition is evaluated
- Field value is checked against comma-separated list
- Field shows/hides based on match result

### Example Usage

```json
{
  "name": "animalName",
  "label": "Animal Name",
  "condition": {
    "name": "item",
    "operator": "in",
    "value": "cat,dog"
  }
}
```

**Behavior**:

- `animalName` field only displays when `item` field has value "cat" OR "dog"

### Testing Status

✅ TypeScript compile clean for this change set  
✅ Unit tests: `tests/opsvForm/models/conditionOperators.test.ts` (helpers, aliases, in/!= across field types, empty list, case sensitivity, integer string tokens, Decimal non-throw / `!=` bad RHS, Date via `formatYmd`)  
⏳ Optional manual smoke in form simulator when editing real report types

### Hardening (uncaught exceptions)

`Decimal` comparisons used to throw on bad list tokens (`new Decimal("xyz")`). Shared helpers in `lib/opsvForm/models/conditionList.ts` never throw; each field `evaluate()` also wraps in try/catch and returns `false` on unexpected errors.

### Operator aliases (mobile + staging compatibility)

List membership is one feature with several wire names:

| Wire / JSON operator | Treated as                                     |
| -------------------- | ---------------------------------------------- |
| `in`                 | list membership (canonical in MS UI / runtime) |
| `has_one_of`         | same (staging DB + older form builder)         |
| `hasOneOf`           | same (mobile)                                  |
| `isOneOf`            | same (mobile)                                  |

- Runtime: `normalizeConditionOperator()` folds aliases → `"in"` before field switches.
- `parseCondition()` stores the canonical `"in"` on `SimpleCondition`.
- Form builder: `normalizeComparableOperator()` maps aliases → `"in"` so the select shows "is in".
- **Mobile follow-up (separate PR):** ohtk-mobile still does not parse `"in"`. Existing staging forms using `has_one_of` work on both clients. New MS-authored conditions that save `"in"` need a mobile PR (or a later MS choice to emit `has_one_of` on save).

### Semantics intentionally kept

| Topic | Behavior | Why not changed |
| ----- | -------- | --------------- |
| Integer `"in"` | Exact digit string after `n.toString()` (`3` matches `"3"`, not `"03"` / `"3.0"`) | Same as mobile string `isOneOf`; numeric coercion would diverge clients |
| Decimal `"!="` with non-numeric RHS | Returns **true** when field has a value (`2.5 != "xyz"`) | Value is not equal to an invalid number; never throws (old path threw) |
| Date condition value | Strict `yyyy-mm-dd` via `formatYmd` | Clear authoring contract; free-form `Date` parse was ambiguous |
| List token trim | List side trimmed; current field value not auto-trimmed | Matches mobile; values come from controlled choice/inputs |
| Sample form JSON under `formBuilder/` | Not imported by runtime | Template/reference only; not a production load path |

### Documentation

- 📄 **This Summary**: `docs/IMPLEMENTATION_SUMMARY_IN_OPERATOR.md` (authoritative notes for this feature)

### Next Steps

1. **Mobile PR (later)**: parse `"in"` as list membership (same as `isOneOf`)
2. Phase 2: comparison operators (`>`, `>=`, `<`, `<=`) if product needs them
3. Phase 3: `"between"` if product needs it
4. Phase 4: `contain` vs `contains` naming consistency

---

## Quick Reference

### Supported Field Types for "in" Operator

- ✅ Text
- ✅ Textarea
- ✅ Integer
- ✅ Decimal
- ✅ Date (condition value format: **yyyy-mm-dd**)
- ✅ Single Choices
- ✅ Subform

### Not Supported

- ❌ Multiple Choices (multiple values field)
- ❌ Images (array field)
- ❌ Files (array field)
- ❌ Location (complex object)

### Value Format

- Comma-separated string
- List tokens: whitespace trimmed automatically
- Case-sensitive matching
- Integer tokens: exact decimal-less digit form of the number (e.g. `"3"`, not `"03"`)
- Date tokens: `yyyy-mm-dd` only
- Examples: `"cat,dog"` or `"cat, dog"` or `"1,2,3"`

---

**Implementation Completed**: 2026-07-09  
**Hardening + unit tests + aliases**: 2026-07-14  
**Status**: ✅ MS complete for this PR; mobile `"in"` deferred

### Filename note: `village-animal-sick-death-definition.json`

The original commit (`ea2144f` message: "form **definiton** - village animal sick/death") used a typo in the **filename** (`…-definiton.json`). That is **not** produced by the form parser:

- FormBuilder APIs use the parameter name `definition` correctly (`formViewModel.parse(definition)`, field `parse(definition)`, etc.).
- Other sample files use the correct spelling (`testdefinition.json`).
- The typo appears only in the human-chosen path/commit subject (`definiton` missing an `i`).

It was a human/file naming typo only. The file was renamed to `village-animal-sick-death-definition.json`. It is a **sample/template**, not loaded by app code at runtime.
