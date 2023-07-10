import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as cron from 'node-cron';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl: string = 'https://pqboaumpjfdgaswussat.supabase.co';
    const supabaseKey: string =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxYm9hdW1wamZkZ2Fzd3Vzc2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMjIwNjcsImV4cCI6MTk5NTU5ODA2N30.3krnH-cZg2X8nv-LW_3DidQ4KvQNSz5fJmD48A8qNvs';
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
