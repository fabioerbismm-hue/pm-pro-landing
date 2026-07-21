import { z } from "zod";
export const leadSchema = z.object({
  firstName:z.string().trim().min(2,"Inserisci il nome"), lastName:z.string().trim().min(2,"Inserisci il cognome"),
  email:z.email("Inserisci un’email valida"), phone:z.string().trim().min(7,"Inserisci un numero valido"),
  company:z.string().trim().min(2,"Inserisci il nome dell’azienda"), website:z.string().trim().optional(), area:z.string().trim().min(2,"Indica l’area operativa"), years:z.string().min(1,"Seleziona un’opzione"),
  properties:z.string().min(1,"Seleziona un’opzione"), capacity:z.string().min(1,"Seleziona un’opzione"), acquisition:z.array(z.string()).min(1,"Seleziona almeno un canale"), obstacle:z.string().trim().min(5,"Raccontaci brevemente l’ostacolo"), investment:z.string().min(1,"Seleziona un’opzione"),
  privacy:z.literal(true,{error:"Il consenso privacy è necessario"}), marketing:z.boolean().optional(), companySite:z.string().max(0).optional(), utm:z.record(z.string(),z.string()).optional(), referrer:z.string().optional()
});
export type LeadData = z.infer<typeof leadSchema>;
