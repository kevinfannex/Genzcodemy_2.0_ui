import type { FormAnswers, FormDetail, FormSummary, FormField } from "@/types";
import { MOCK_FORMS, MOCK_FORM_DETAILS } from "./admin";

const MOCK_SUBMISSIONS = new Set<string>();

export const formsApi = {
  myForms: async () => {
    // Map admin forms to student form summaries
    // Real API would filter by assigned student ID or "all_students"
    const studentForms = MOCK_FORMS.filter(f => f.is_active).map(f => {
      const details = MOCK_FORM_DETAILS[f.id];
      return {
        id: f.id,
        title: f.title,
        description: details ? details.description : "Please complete this form.",
        is_submitted: MOCK_SUBMISSIONS.has(f.id),
        created_at: f.created_at
      } as FormSummary;
    });
    
    return { forms: studentForms };
  },

  getById: async (id: string) => {
    const adminForm = MOCK_FORMS.find(f => f.id === id);
    const details = MOCK_FORM_DETAILS[id];
    
    const fields: FormField[] = details 
      ? details.fields.map((f, i) => ({
          id: `field-${i}`,
          label: f.label,
          field_type: f.field_type,
          options: f.options || null,
          is_required: f.is_required,
          order_index: f.order_index,
        }))
      : [
          {
            id: "field-1",
            label: "Your Feedback",
            field_type: "long_text",
            options: null,
            is_required: true,
            order_index: 0
          }
        ];

    return {
      id,
      title: adminForm ? adminForm.title : "Mock Form",
      description: details ? details.description : "Please complete this form.",
      fields,
    } as FormDetail;
  },

  submit: async (id: string, answers: FormAnswers) => {
    // Increment response count in mock state
    const adminForm = MOCK_FORMS.find(f => f.id === id);
    if (adminForm) {
      adminForm.responses_count += 1;
    }
    
    MOCK_SUBMISSIONS.add(id);
    
    return {
      id: "mock-response-123",
      submitted_at: new Date().toISOString(),
    };
  },
};
