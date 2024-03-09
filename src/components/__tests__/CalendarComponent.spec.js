import { mount } from '@vue/test-utils';
import {describe, it, expect} from 'vitest';
import CalendarComponent from '@/components/Calendar.vue';

describe('CalendarComponent', () => {
  const appointmentsResponse = [
    {
      id: 1,
      patientId: 1,
      startTime: '2024-03-08T09:00:00',
      type: 'firstVisit',
      status: 'pending',
      description: 'Test Appointment Description',
    },
    // Adicione mais dados de consulta conforme necessário
  ];

  const patientsResponse = [
    {
      id: 1,
      name: 'John Doe',
    },
    // Adicione mais dados de paciente conforme necessário
  ];

  const createMountedComponent = () => {
    return mount(CalendarComponent, {
      props: {
        appointmentsResponse,
        patientsResponse,
      },
    });
  };

  it('renders correctly with initial data', async () => {
    const wrapper = createMountedComponent();
    await wrapper.vm.$nextTick();

    // Adicione asserções conforme necessário
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.findAll('tr').length).toBeGreaterThan(0);
  });

  it('displays appointments for each hour and day', async () => {
    const wrapper = createMountedComponent();
    await wrapper.vm.$nextTick();

    // Adicione asserções para verificar se os compromissos são exibidos corretamente
    expect(wrapper.findAll('.shadow-md').length).toBeGreaterThan(0);
  });

  it('correctly applies appointment status colors', async () => {
    const wrapper = createMountedComponent();
    await wrapper.vm.$nextTick();

    // Adicione asserções para verificar se as classes de cor são aplicadas corretamente
    const appointmentElement = wrapper.find('.shadow-md');
    expect(appointmentElement.classes()).toContain('bg-blue-500'); // Ajuste conforme necessário
  });

});