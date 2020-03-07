import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Checkbox, InputNumber } from 'antd';

const options = [
  { label: 'COOKING NOW', value: 'CREATED' },
  // { label: 'JUST COOKED', value: 'JUST_COOKED' },
  { label: 'COOKED', value: 'COOKED' },
  { label: 'DRIVER_RECEIVED', value: 'DRIVER_RECEIVED' },
  { label: 'CANCELLED', value: 'CANCELLED' },
  { label: 'DELIVERED', value: 'DELIVERED' },
];

const Filter = ({ initOptions, setFilter }) => {
  const [checked, setChecked] = useState(initOptions);
  const [justCookedTime, setJustCookedTime] = useState(1);

  useEffect(() => {
    setFilter(checked);
  }, [checked, setFilter]);

  const justCookedChecked = useMemo(() => {
    const justCookedIdx = checked.findIndex(
      item => typeof item === 'object' && item.key === 'JUST_COOKED',
    );

    return justCookedIdx > -1 ? [checked[justCookedIdx]] : [];
  }, [checked]);

  const onChange = useCallback(
    value => {
      setChecked(() => [...value, ...justCookedChecked]);
    },
    [justCookedChecked],
  );

  const onCheckActive = useCallback(
    e => {
      if (e.target.checked) {
        setChecked(() => [...initOptions, ...justCookedChecked]);
      } else {
        setChecked(() => [...justCookedChecked]);
      }
    },
    [initOptions, justCookedChecked],
  );

  const activeChecked = useMemo(() => {
    return (
      checked.includes('CREATED') &&
      checked.includes('COOKED') &&
      checked.includes('DRIVER_RECEIVED') &&
      !checked.includes('CANCELLED') &&
      !checked.includes('DELIVERED')
    );
  }, [checked]);

  const onCheckJustCooked = useCallback(
    e => {
      if (e.target.checked) {
        setChecked(() => [
          ...checked,
          {
            key: 'JUST_COOKED',
            value: justCookedTime,
          },
        ]);
      } else {
        setChecked(() =>
          checked.filter(
            item => typeof item !== 'object' || item.key !== 'JUST_COOKED',
          ),
        );
      }
    },
    [checked, justCookedTime],
  );

  const onChangeJustCookedTime = useCallback(
    value => {
      setJustCookedTime(value);

      const idx = checked.findIndex(
        item => typeof item === 'object' && item.key === 'JUST_COOKED',
      );
      if (idx > -1) {
        checked[idx].value = value;
        setChecked(() => [...checked]);
      }
    },
    [checked],
  );

  return (
    <div>
      <div style={{ lineHeight: '32px' }}>
        <Checkbox onChange={onCheckActive} checked={activeChecked}>
          ACTIVE ORDER
        </Checkbox>
        <Checkbox onChange={onCheckJustCooked}>JUST COOKED IN</Checkbox>
        <InputNumber
          style={{ width: 50 }}
          size="small"
          min={1}
          defaultValue={justCookedTime}
          onChange={onChangeJustCookedTime}
        />
        {' s'}
      </div>

      <Checkbox.Group options={options} value={checked} onChange={onChange} />
    </div>
  );
};

export default Filter;
