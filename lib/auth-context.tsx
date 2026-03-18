'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  error: string | null
  loading?: boolean
  signUp: (email: string, password: string, displayName?: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [supabase, setSupabase] = useState<any>(null)

  useEffect(() => {
    try {
      const client = createClient()
      setSupabase(client)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Supabase'
      setError(errorMessage)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      return
    }

    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  const signUp = async (email: string, password: string, displayName?: string) => {
    if (!supabase) throw new Error('Supabase not initialized')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    })

    if (error) throw error
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase not initialized')
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
  }

  const signOut = async () => {
    if (!supabase) throw new Error('Supabase not initialized')
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const logout = async () => {
    await signOut()
  }

  const resetPassword = async (email: string) => {
    if (!supabase) throw new Error('Supabase not initialized')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) throw error
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        error,
        loading: isLoading,
        signUp,
        signIn,
        signOut,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
