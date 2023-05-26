import React from 'react'
import { GetRepositoryQuery } from '@/entities/repos'
import { useParams } from 'react-router-dom'
import { Loading } from '@/shared/ui'
import { getDateFormat } from '@/shared/lib/date'

const DetailReposPage = () => {
  const { owner, name } = useParams()
  const {
    data: repository,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = GetRepositoryQuery({
    owner: owner || '',
    name: name || '',
  })

  if (isLoading || isFetching || !(isSuccess || isError))
    return <Loading fullScreen />

  if (isError || !repository) return 'Произошла ошибка'

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-bold text-[24px]">
          {repository.data.repository.name}
        </div>
        <div className="flex items-center">
          <a
            className="pr-[15px] text-[20px] underline text-"
            href={repository.data.repository.owner.url}
            target="_blank"
            rel="noreferrer"
          >
            {repository.data.repository.owner.login}
          </a>
          <div className="w-[100px] h-[100px] rounded-[8px]">
            <a
              href={repository.data.repository.owner.url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={repository.data.repository.owner.avatarUrl}
                alt="avatar"
                className="object-cover rounded-[8px]"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center pt-[10px]">
        <div className="pr-[5px]">Звезд:</div>{' '}
        {repository.data.repository.stargazerCount}
      </div>
      <div className="flex items-center pt-[10px]">
        <div className="pr-[5px]">Последний коммит:</div>
        {getDateFormat(repository.data.repository.pushedAt, 'DD.MM.YYYY')}
      </div>
      <div className="flex items-center pt-[10px]">
        <div className="pr-[5px]">Описание:</div>
        <div
          ref={(elem) => {
            if (elem) {
              elem.innerHTML =
                repository.data.repository.shortDescriptionHTML ||
                '<span>&mdash;</span>'
            }
          }}
        />
      </div>
      <div className="pt-[10px]">
        <div className="pr-[5px]">Языки программирования:</div>
        <div className="flex flex-wrap gap-[10px] pt-[5px] max-w-[300px]">
          {repository.data.repository.languages.nodes.map(({ color, name }) => (
            <div className="flex items-center" key={`${name}-${color}`}>
              <div
                className="w-[10px] h-[10px] rounded-[8px]"
                style={{
                  backgroundColor: color,
                }}
              />
              <div className="pl-[5px]">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailReposPage
