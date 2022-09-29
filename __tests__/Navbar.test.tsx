/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Navbar from '../components/Navbar'

it('コスゲリオンが存在するか', () => {
  render(<Navbar />)
  expect(screen.getByText('Kosugelion')).toBeInTheDocument()
})
