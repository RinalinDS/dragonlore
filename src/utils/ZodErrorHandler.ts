import { toast } from 'react-toastify';
import { ZodError } from 'zod';

export const ZodErrorHandler = (e: Error) => {
  if (e instanceof ZodError) {
    const uniqueMistakes = Array.from(
      new Set(
        e.issues.map((issue) => `${issue.message} in ${issue.path[1]} param`)
      )
    );

    if (uniqueMistakes.length > 1) {
      uniqueMistakes.forEach((errorMessage) => {
        toast.error(`Validation error: ${errorMessage}`);
      });
    } else {
      const firstError = e.issues[0];
      toast.error(
        `Validation error: ${firstError.message} in ${firstError.path[1]} param`
      );
    }
  }
  return [];
};
