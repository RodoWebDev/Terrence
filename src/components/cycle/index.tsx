import React from 'react';
import { CycleContainer, CycleHeader, CycleBody, CycleBoxContainer } from 'UI/Container';
import { CycleHeaderDate, CycleHeaderYear, CycleBoxTitle, CycleBoxDesc } from 'UI/Label';
import moment from 'moment';

const Cycle = ({data}: any) => {
  return (
    <CycleContainer>
      <CycleHeader>
        <CycleHeaderDate>{moment(data.cycleStartDate).format('MMM DD ')} - {moment(data.cycleEndDate).format('MMM DD')}</CycleHeaderDate>
        <CycleHeaderYear>{moment(data.cycleStartDate).format('YYYY')}</CycleHeaderYear>
      </CycleHeader>
      <CycleBody>
        <CycleBoxContainer>
          <CycleBoxTitle>{data.onTimeStart}%</CycleBoxTitle>
          <CycleBoxDesc>On Time Start</CycleBoxDesc>
        </CycleBoxContainer>
        <CycleBoxContainer>
          <CycleBoxTitle>{data.onTimeFinish}%</CycleBoxTitle>
          <CycleBoxDesc>On Time Finish</CycleBoxDesc>
        </CycleBoxContainer>
        <CycleBoxContainer>
          <CycleBoxTitle>{data.daysLost}d</CycleBoxTitle>
          <CycleBoxDesc>Days Lost</CycleBoxDesc>
        </CycleBoxContainer>
        <CycleBoxContainer>
          <CycleBoxTitle>{data.throughput}%</CycleBoxTitle>
          <CycleBoxDesc>ThroughPut</CycleBoxDesc>
        </CycleBoxContainer>
      </CycleBody>
      <CycleBody>
      </CycleBody>
    </CycleContainer>
  );
};

export default Cycle;
