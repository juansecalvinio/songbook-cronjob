import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as cron from 'node-cron';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl: string = process.env.SUPABASE_URL;
    const supabaseKey: string = process.env.SUPABASE_KEY;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  public startScheduledRequest(): void {
    cron.schedule('0 0 * * *', () => {
      this.makeRequest();
    });
  }

  private async makeRequest(): Promise<void> {
    try {
      const { data, error } = await this.supabase.from('songs').select();

      if (error) {
        throw new Error(error.message);
      }

      console.log('[LOG SUCCESS] Solicitud exitosa: ', data);
    } catch (error) {
      console.log('[LOG ERROR] Ocurrió un error en la solicitud: ', error);
    }
  }
}
