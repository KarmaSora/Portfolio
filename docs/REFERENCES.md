# References section

The portfolio's **References & recommendations** section displays the existing written recommendations and a **Request references** email link. The current decision is to keep reference contacts in the private career inventory and leave `professionalReferences` empty. Share selected contacts with recruiters when requested. The CV is managed separately.

## Optional public reference cards

The implementation supports public reference cards if the author later chooses to publish them. Only then add an entry to `professionalReferences` in `public/data/portfolio.json`, using confirmed details and the person's permission to appear publicly. Everything in this JSON file is publicly downloadable, including unused fields. Keep private contacts outside it; both the master career inventory and the separate contact-source markdown are excluded from Git. Do not copy their contact directories into the public JSON.

This is a template, not a real reference:

```json
{
  "id": "reference-unique-id",
  "name": "Approved public name",
  "role": "Confirmed role or title",
  "organization": "Organization",
  "relationship": "How this person worked with Karam",
  "canDiscuss": ["Specific work they can speak about"]
}
```

The fields above describe a card without direct contact details. Recruiters can use **Request references** to get in touch with Karam. These fields are optional and should only be added when supplied and approved for public use:

| Field | Value |
| --- | --- |
| `email` | Approved public email address |
| `phone` | Approved phone number, including country code |
| `linkedin` | The person's LinkedIn profile URL |
| `quote` | An exact, approved testimonial; omit until supplied |

Do not copy wording from a recommendation into a quote without checking its attribution and intended use. A prospective contact is not automatically a confirmed reference.

## Edit the introduction or email prompt

`referencesContent` contains the section title, introduction, request button label and request description. The email link uses `personalInfo.email` and prepares a request; it does not send a message automatically.

## Written recommendations

Documents with `type: "recommendation"` in the existing `documents` array appear here. Degree documents and certificates remain in **Documents & Certificates**. Their existing files are unchanged.
