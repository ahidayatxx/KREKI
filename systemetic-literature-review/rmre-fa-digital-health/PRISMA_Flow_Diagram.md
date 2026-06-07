# PRISMA 2020 Flow Diagram

## Identification of Studies via Databases

**Databases Searched:** PubMed, Web of Science (WoS)

### 1. Identification
*   **Stream A (Context):**
    *   PubMed: 90
    *   Web of Science: 119
    *   *Subtotal:* 209
*   **Stream B (Design):**
    *   PubMed: 236
    *   Web of Science: 6
    *   *Subtotal:* 242

**Total Records Identified:** 451

### 2. Deduplication
*   **Duplicate Records Removed:** 46
    *   *Stream A internal duplicates:* 37
    *   *Stream B internal duplicates:* 1
    *   *Cross-Aim duplicates:* 8

**Records Screened:** 405

### 3. Screening
*   **Records Excluded:** 366
    *   *Reasons:* Wrong Setting (HIC), Wrong Tech (Non-Chat), Wrong Topic (Non-NCD/Other), Wrong Type (Review/Protocol/Abstract), One-way SMS.

**Reports Sought for Retrieval:** 39
*   **Reports Not Retrieved:** 4

**Reports Assessed for Eligibility:** 35
*   **Reports Excluded:** 0

### 4. Included
**Total Studies Included:** 35
*   **Stream A (Indonesia Context):** 16
*   **Stream B (Global Design):** 19

---

## Mermaid Diagram

```mermaid
flowchart TD
    subgraph Identification
        A["Records identified from:<br/>PubMed (n = 326)<br/>Web of Science (n = 125)"] --> B["Total Records Identified<br/>n = 451"]
    end

    subgraph Deduplication
        B --> C{Deduplication}
        C -->|Removed| D["Duplicates removed<br/>n = 46"]
        C --> E["Records screened<br/>n = 405"]
    end

    subgraph Screening
        E --> F{Screening}
        F -->|Excluded| G["Records excluded<br/>n = 366"]
        F --> H["Reports sought for retrieval<br/>n = 39"]
        H -->|Not retrieved| NR["Reports not retrieved<br/>n = 4"]
        H --> I["Reports assessed for eligibility<br/>n = 35"]
        I -->|Excluded| J["Reports excluded<br/>n = 0"]
    end

    subgraph Included
        I --> K["Total studies included<br/>n = 35"]
        K --> L["Stream A: Context - Indonesia<br/>n = 16"]
        K --> M["Stream B: Design - Global<br/>n = 19"]
    end
```
