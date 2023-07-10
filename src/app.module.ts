import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Module({
  providers: [SupabaseService],
})
export class AppModule {
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabaseService.startScheduledRequest();
  }
}
