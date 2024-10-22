<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Task;

final class DeleteTask
{
    public function __invoke($root_, array $args)
    {
        $task = Task::findOrFail($args['id']);

        $task->delete();

        return $task;
    }
}
