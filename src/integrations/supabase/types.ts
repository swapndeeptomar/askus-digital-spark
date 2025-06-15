export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about_stats: {
        Row: {
          id: number
          key: string
          value: number
        }
        Insert: {
          id?: number
          key: string
          value?: number
        }
        Update: {
          id?: number
          key?: string
          value?: number
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author: string | null
          content: string
          cover_image_url: string | null
          created_at: string
          id: string
          title: string
        }
        Insert: {
          author?: string | null
          content: string
          cover_image_url?: string | null
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          author?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      chatbot: {
        Row: {
          created_at: string
          id: string
          page_path: string | null
          source: string
          user_email: string | null
          user_input: string
        }
        Insert: {
          created_at?: string
          id?: string
          page_path?: string | null
          source: string
          user_email?: string | null
          user_input: string
        }
        Update: {
          created_at?: string
          id?: string
          page_path?: string | null
          source?: string
          user_email?: string | null
          user_input?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          mobile: string | null
          name: string
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          mobile?: string | null
          name: string
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          mobile?: string | null
          name?: string
          subject?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          number: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          number: string
          status: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          number?: string
          status?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          pdf_filename: string
          pdf_url: string | null
          phone: string | null
          project_details: string
          selected_services: Json
          total_estimate: number
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          pdf_filename: string
          pdf_url?: string | null
          phone?: string | null
          project_details: string
          selected_services: Json
          total_estimate: number
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          pdf_filename?: string
          pdf_url?: string | null
          phone?: string | null
          project_details?: string
          selected_services?: Json
          total_estimate?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_initial: string | null
          company: string | null
          created_at: string
          id: string
          message: string
          name: string
          role: string | null
        }
        Insert: {
          avatar_initial?: string | null
          company?: string | null
          created_at?: string
          id?: string
          message: string
          name: string
          role?: string | null
        }
        Update: {
          avatar_initial?: string | null
          company?: string | null
          created_at?: string
          id?: string
          message?: string
          name?: string
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
