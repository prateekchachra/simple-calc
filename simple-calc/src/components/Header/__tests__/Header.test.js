import {render, screen, fireEvent} from '@testing-library/react';

import Header from '../';

const MOCK_TITLE = 'mock'
describe('Header', () => {
    
    beforeAll(() => {
        console.log('Testing Header Component...')
    });

    it('should render header title', () => {
        render(<Header title={MOCK_TITLE}/>);
        const titleElement = screen.getByText(MOCK_TITLE);
        expect(titleElement).toBeInTheDocument();
    });
    it('should render the header with a default empty title if title is not specified', () => {
        render(<Header />);
        const titleElement = screen.getByRole('heading');
        expect(titleElement).toBeInTheDocument();
    });

    afterAll(() => {
        console.log('Tests for Header Component finished...')
    })
})
