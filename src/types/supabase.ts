export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      custom_rosaries: {
        Row: {
          beads_count: number | null
          centerpiece_description: string | null
          color: string | null
          created_at: string | null
          created_for: string | null
          crucifix_description: string | null
          customer_name: string | null
          description: string | null
          id: string
          image: string | null
          material: string | null
          name: string
          price: number | null
        }
        Insert: {
          beads_count?: number | null
          centerpiece_description?: string | null
          color?: string | null
          created_at?: string | null
          created_for?: string | null
          crucifix_description?: string | null
          customer_name?: string | null
          description?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name: string
          price?: number | null
        }
        Update: {
          beads_count?: number | null
          centerpiece_description?: string | null
          color?: string | null
          created_at?: string | null
          created_for?: string | null
          crucifix_description?: string | null
          customer_name?: string | null
          description?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name?: string
          price?: number | null
        }
        Relationships: []
      }
      inventory_centerpieces: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          finish: string | null
          id: string
          image: string | null
          material: string | null
          name: string
          price: number | null
          size: string | null
          stock_quantity: number | null
          type: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name: string
          price?: number | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name?: string
          price?: number | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Relationships: []
      }
      inventory_crosses: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          finish: string | null
          id: string
          image: string | null
          material: string | null
          name: string
          price: number | null
          size: string | null
          stock_quantity: number | null
          type: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name: string
          price?: number | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name?: string
          price?: number | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Relationships: []
      }
      inventory_hail_mary_beads: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          finish: string | null
          id: string
          image: string | null
          material: string | null
          name: string
          price_per_bead: number | null
          shape: string | null
          size: string | null
          stock_quantity: number | null
          type: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name: string
          price_per_bead?: number | null
          shape?: string | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name?: string
          price_per_bead?: number | null
          shape?: string | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Relationships: []
      }
      inventory_links: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          finish: string | null
          id: string
          image: string | null
          material: string | null
          name: string
          price_per_link: number | null
          size: string | null
          stock_quantity: number | null
          type: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name: string
          price_per_link?: number | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name?: string
          price_per_link?: number | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Relationships: []
      }
      inventory_medals: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          finish: string | null
          id: string
          image: string | null
          material: string | null
          name: string
          price: number | null
          saint_or_symbol: string | null
          size: string | null
          stock_quantity: number | null
          type: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name: string
          price?: number | null
          saint_or_symbol?: string | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name?: string
          price?: number | null
          saint_or_symbol?: string | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Relationships: []
      }
      inventory_our_father_beads: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          finish: string | null
          id: string
          image: string | null
          material: string | null
          name: string
          price_per_bead: number | null
          shape: string | null
          size: string | null
          stock_quantity: number | null
          type: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name: string
          price_per_bead?: number | null
          shape?: string | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          finish?: string | null
          id?: string
          image?: string | null
          material?: string | null
          name?: string
          price_per_bead?: number | null
          shape?: string | null
          size?: string | null
          stock_quantity?: number | null
          type?: string | null
        }
        Relationships: []
      }
      inventory_ropes: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          length_per_unit: string | null
          material: string | null
          name: string
          price_per_unit: number | null
          stock_quantity: number | null
          thickness: string | null
          type: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          length_per_unit?: string | null
          material?: string | null
          name: string
          price_per_unit?: number | null
          stock_quantity?: number | null
          thickness?: string | null
          type?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          length_per_unit?: string | null
          material?: string | null
          name?: string
          price_per_unit?: number | null
          stock_quantity?: number | null
          thickness?: string | null
          type?: string | null
        }
        Relationships: []
      }
      inventory_wires: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          gauge: string | null
          id: string
          image: string | null
          length_per_unit: string | null
          material: string | null
          name: string
          price_per_unit: number | null
          stock_quantity: number | null
          type: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          gauge?: string | null
          id?: string
          image?: string | null
          length_per_unit?: string | null
          material?: string | null
          name: string
          price_per_unit?: number | null
          stock_quantity?: number | null
          type?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          gauge?: string | null
          id?: string
          image?: string | null
          length_per_unit?: string | null
          material?: string | null
          name?: string
          price_per_unit?: number | null
          stock_quantity?: number | null
          type?: string | null
        }
        Relationships: []
      }
      master_rosaries: {
        Row: {
          centerpiece_id: string | null
          created_at: string | null
          cross_id: string | null
          description: string | null
          hail_mary_bead_count: number | null
          hail_mary_bead_id: string | null
          id: string
          image: string | null
          is_available: boolean | null
          link_id: string | null
          medal_id: string | null
          name: string
          our_father_bead_count: number | null
          our_father_bead_id: string | null
          rope_id: string | null
          total_price: number | null
          wire_id: string | null
        }
        Insert: {
          centerpiece_id?: string | null
          created_at?: string | null
          cross_id?: string | null
          description?: string | null
          hail_mary_bead_count?: number | null
          hail_mary_bead_id?: string | null
          id?: string
          image?: string | null
          is_available?: boolean | null
          link_id?: string | null
          medal_id?: string | null
          name: string
          our_father_bead_count?: number | null
          our_father_bead_id?: string | null
          rope_id?: string | null
          total_price?: number | null
          wire_id?: string | null
        }
        Update: {
          centerpiece_id?: string | null
          created_at?: string | null
          cross_id?: string | null
          description?: string | null
          hail_mary_bead_count?: number | null
          hail_mary_bead_id?: string | null
          id?: string
          image?: string | null
          is_available?: boolean | null
          link_id?: string | null
          medal_id?: string | null
          name?: string
          our_father_bead_count?: number | null
          our_father_bead_id?: string | null
          rope_id?: string | null
          total_price?: number | null
          wire_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "master_rosaries_centerpiece_id_fkey"
            columns: ["centerpiece_id"]
            isOneToOne: false
            referencedRelation: "inventory_centerpieces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "master_rosaries_cross_id_fkey"
            columns: ["cross_id"]
            isOneToOne: false
            referencedRelation: "inventory_crosses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "master_rosaries_hail_mary_bead_id_fkey"
            columns: ["hail_mary_bead_id"]
            isOneToOne: false
            referencedRelation: "inventory_hail_mary_beads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "master_rosaries_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "inventory_links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "master_rosaries_medal_id_fkey"
            columns: ["medal_id"]
            isOneToOne: false
            referencedRelation: "inventory_medals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "master_rosaries_our_father_bead_id_fkey"
            columns: ["our_father_bead_id"]
            isOneToOne: false
            referencedRelation: "inventory_our_father_beads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "master_rosaries_rope_id_fkey"
            columns: ["rope_id"]
            isOneToOne: false
            referencedRelation: "inventory_ropes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "master_rosaries_wire_id_fkey"
            columns: ["wire_id"]
            isOneToOne: false
            referencedRelation: "inventory_wires"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_requests: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_anonymous: boolean | null
          name: string
          prayer_request: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_anonymous?: boolean | null
          name: string
          prayer_request: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_anonymous?: boolean | null
          name?: string
          prayer_request?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          low_stock_threshold: number | null
          material: string | null
          name: string
          price: number
          sku: string | null
          stock_quantity: number
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          low_stock_threshold?: number | null
          material?: string | null
          name: string
          price: number
          sku?: string | null
          stock_quantity?: number
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          low_stock_threshold?: number | null
          material?: string | null
          name?: string
          price?: number
          sku?: string | null
          stock_quantity?: number
          updated_at?: string | null
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
