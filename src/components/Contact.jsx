import { useState } from 'react';
import { Alert, Box, Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/profile.js';
import { tokens } from '../theme/theme.js';
import Press from './Press.jsx';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

// Set VITE_FORM_ENDPOINT in .env to send the form straight from the site.
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const emptyForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    // No backend configured: hand the message to the visitor's email app. This is a real
    // action (a drafted email), not a simulated "message sent" state.
    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      setStatus('success');
      setForm(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-title"
      sx={{
        position: 'relative',
        zIndex: 1,
        py: { xs: 12, md: 20 },
        borderTop: `1px solid ${tokens.border}`,
        background: 'radial-gradient(60% 70% at 15% 100%, rgba(124, 140, 255, 0.1), transparent 70%)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '6fr 5fr' },
            columnGap: { md: 12 },
            rowGap: 8,
          }}
        >
          <Box>
            <SectionHeader index="05" label="Contact" title="Let’s build something thoughtful together." id="contact-title" sx={{ mb: 5 }} />
            <Reveal delay={0.1}>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mb: 5 }}>
                Have a project, a role or just an idea you’d like to talk through? I’d love to hear about it.
              </Typography>

              <Press>
                <Box
                  component="a"
                  href={`mailto:${profile.email}`}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.5,
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: 'text.primary',
                    textDecoration: 'none',
                    borderBottom: `1px solid ${tokens.borderStrong}`,
                    pb: 0.5,
                    wordBreak: 'break-word',
                    transition: 'border-color .25s ease, color .25s ease',
                    '&:hover': { color: 'primary.main', borderColor: tokens.accent },
                  }}
                >
                  {profile.email}
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Box>
              </Press>

              <Stack direction="row" spacing={1.5} sx={{ mt: 5 }}>
                <IconButton component="a" href={`mailto:${profile.email}`} aria-label="Send an email">
                  <Mail size={19} aria-hidden="true" />
                </IconButton>
                <IconButton
                  component="a"
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                >
                  <Github size={19} aria-hidden="true" />
                </IconButton>
                <IconButton
                  component="a"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                >
                  <Linkedin size={19} aria-hidden="true" />
                </IconButton>
              </Stack>
            </Reveal>
          </Box>

          <Reveal delay={0.15}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              aria-label="Contact form"
              className="glass"
              sx={{ p: { xs: 3, md: 4.5 }, borderRadius: 5 }}
            >
              <Stack spacing={2.5}>
                <TextField
                  id="contact-name"
                  label="Your name"
                  value={form.name}
                  onChange={update('name')}
                  autoComplete="name"
                  required
                  fullWidth
                />
                <TextField
                  id="contact-email"
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  autoComplete="email"
                  required
                  fullWidth
                />
                <TextField
                  id="contact-message"
                  label="Message"
                  value={form.message}
                  onChange={update('message')}
                  required
                  multiline
                  minRows={5}
                  fullWidth
                />

                <Box>
                  <Button type="submit" variant="contained" color="primary" disabled={status === 'sending'} fullWidth>
                    {status === 'sending' ? 'Sending…' : FORM_ENDPOINT ? 'Send message' : 'Compose email'}
                  </Button>
                </Box>

                <Box role="status" aria-live="polite">
                  {status === 'success' && <Alert severity="success">Thanks — your message has been sent.</Alert>}
                  {status === 'error' && (
                    <Alert severity="error">
                      Something went wrong. Please email me directly at{' '}
                      <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                    </Alert>
                  )}
                </Box>

                {!FORM_ENDPOINT && (
                  <Typography variant="body2" color="text.secondary">
                    This form opens your email app with the message pre-filled. To send straight from the site, set{' '}
                    <code>VITE_FORM_ENDPOINT</code> to a form service URL (see the README).
                  </Typography>
                )}
              </Stack>
            </Box>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
