import { useMutation } from '@tanstack/react-query';
import {
  createPartOneOrder,
  type CreatePartOneOrderPayload,
  type CreatePartOneOrderResponse
} from '../../services/dashboardApi/partOneOrderService';

export function useCreatePartOneOrder() {
  return useMutation<CreatePartOneOrderResponse, Error, CreatePartOneOrderPayload>({
    mutationFn: createPartOneOrder
  });
}
