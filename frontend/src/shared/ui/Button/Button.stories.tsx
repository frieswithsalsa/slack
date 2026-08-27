import type { Meta, StoryObj } from '@storybook/react-vite';
import styles from './Button.stories.module.scss';
import { Button } from './Button';
import {expect, fn } from 'storybook/test';
import { Save } from 'lucide-react';

const meta = {
    component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Create",
    },
};

export const Disabled: Story = {
    args: {
        children: "Create",
        disabled: true,
    },
};

export const LongText: Story = {
    args: {
        children: 'Save changes and continue',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '230px' }}>
                <Story />
            </div>
        ),
    ],
};

export const WithIcon: Story = {
    args: {
        children: <>
            <Save size={16} aria-hidden="true" />
            Save
        </>,
    },
};

export const WithCustomClass: Story = {
    args: {
        children: 'Save',
        className: styles.primaryAction
    },
};

export const Click: Story = {
    args: {
        children: 'Save',
        onClick: fn()
    },
    play: async ({ args, canvas, userEvent }) => {
        const button = canvas.getByRole('button', { name: 'Save' });

        await userEvent.click(button);

        await expect(args.onClick).toHaveBeenCalledTimes(1);
    },
};
