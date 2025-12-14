import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Script to reset a user's password
 * Usage:
 *   pnpm reset-password <email> <new-password>
 *   Example: pnpm reset-password blograso@gmail.com mynewpass123
 *
 * Or run directly:
 *   pnpm tsx --env-file=.env src/scripts/reset-password.ts <email> <new-password>
 */
async function resetPassword() {
  try {
    const payload = await getPayload({
      config: await config,
    })

    // Get email and password from command line args or use defaults
    const userEmail = process.argv[2] || 'blograso@gmail.com'
    const newPassword = process.argv[3] || 'newpassword123'

    if (!userEmail || !newPassword) {
      console.error('❌ Usage: pnpm reset-password <email> <new-password>')
      process.exit(1)
    }

    console.log(`🔄 Attempting to reset password for: ${userEmail}`)

    // Find the user
    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: userEmail,
        },
      },
    })

    if (users.docs.length === 0) {
      console.error(`❌ User not found: ${userEmail}`)
      process.exit(1)
    }

    const user = users.docs[0]
    console.log(`✅ Found user: ${user.email} (ID: ${user.id})`)

    // Update the user's password and unlock the account
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: newPassword,
        lockUntil: null,
        loginAttempts: 0,
      },
    })

    console.log(`✅ Password successfully reset for ${userEmail}`)
    console.log(`🔓 Account unlocked (login attempts reset)`)
    console.log(`🔑 New password: ${newPassword}`)
    console.log(`\n🌐 You can now login at: http://localhost:3000/admin`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error resetting password:', error)
    process.exit(1)
  }
}

resetPassword()
