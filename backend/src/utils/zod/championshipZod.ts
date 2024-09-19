import { z } from "zod";

export const CreateChampionshipSchema = z.object({
    name: z.string().min(3).max(255, 'Name must be between 3 and 255 characters'),
    description: z.string().min(3).max(255, 'Description must be between 3 and 255 characters'),
    startDate: z.date().min(new Date(), 'Start date must be greater than today'),
    endDate: z.date({message: 'Invalid date'}),
    city: z.string().min(3).max(255, 'City must be between 3 and 255 characters'),
    state: z.string().min(2).max(255, 'State must be between 2 and 255 characters'),
    country: z.string().min(3).max(255, 'Country must be between 3 and 255 characters'),
    address: z.string().min(3).max(255, 'Address must be between 3 and 255 characters'),
    owner: z.string().min(3).max(255, 'Owner must be between 3 and 255 characters'),
}).refine(data => data.startDate < data.endDate, {
    message: 'End date must be greater than start date',
    path: ['endDate']
});