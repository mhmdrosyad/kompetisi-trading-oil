<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WinnerNotificationMail extends Mailable
{
    use Queueable, SerializesModels;
    public $user;
    public $customRank;
    /**
     * Create a new message instance.
     */
    public function __construct($user, $customRank)
    {
        $this->user = $user;
        $this->customRank = $customRank;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Selamat! Anda Juara ' . $this->customRank . ' - Kompetisi Demo Trading Oil',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.winner-notification',
            with: [
                'user' => $this->user,
                'customRank' => $this->customRank,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
